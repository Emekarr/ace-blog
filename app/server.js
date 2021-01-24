const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// these functions perform database operations
const {
  createUser,
  logInUser,
  saveFeebdback,
  getFeedbacks,
  deleteFeedbacks,
} = require("./scripts/database/databasescripts");
// helps us use cookies
const cookieParser = require("cookie-parser");
// jsonwebtokem
const jwt = require("jsonwebtoken");
// user model
const User = require("./scripts/database/models/user");

//connect to a database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// location to the views folder
const viewsLocation = path.join(__dirname, "./templates/views");
// location to the statics folder
const staticFilesLocation = path.join(__dirname, "./public");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.set("view engine", "ejs");
server.set("views", viewsLocation);

server.use(express.static(staticFilesLocation));

//route for the home page
server.use("/", require("./scripts/routes/homeRoutes"))

//route for posts
server.use("/post", require("./scripts/routes/postroutes"))

//route for admin panel
server.use("/admin", require("./scripts/routes/adminRoute"))

//route for contact
server.use("/contact", require("./scripts/routes/contactRoute"))

server.post("/sendmail", async (req, res) => {
  await deleteFeedbacks(req.query.id, req.body.body);
  const feedbacks = await getFeedbacks();
  res.render("admin", { feedbacks });
});

//router for about
server.use("/about", require("./scripts/routes/aboutRoutes"))

server.use("/updates", require("./scripts/routes/updatesRoutes"))

server.get("/about", (req, res) => {
  res.render("authresult", {
    result: " failed because this page is undone.",
    method: " attempt to get this page has",
  });
});

server.get("/login", (req, res) => {
  res.render("login");
});

server.post("/login", async (req, res) => {
  const token = await logInUser(req.body);
  if (token) {
    res.cookie("token", token, { httpOnly: true });
    res.cookie("loggedIn", true);
    res.redirect("/");
  } else {
    res.render("authresult", { result: " failed", method: "Login" });
  }
});

server.get("/signup", (req, res) => {
  res.render("signup");
});

server.post("/signup", async (req, res) => {
  const userDetails = req.body;
  const token = await createUser(userDetails);

  if (token) {
    res.cookie("token", token, { httpOnly: true });
    res.cookie("loggedIn", true);
    res.render("authresult", {
      result: "was successful!",
      method: "registration ",
    });
  } else {
    res.render("authresult", { result: "failed!", method: "registration " });
  }
});

server.get("/logout", async (req, res) => {
  const cookies = req.cookies;
  const cookieToken = cookies.token;

  try {
    const tokenData = jwt.verify(cookieToken, "supersecretkey");
    const userId = tokenData.id;
    const user = await User.findOne({
      _id: userId,
      "tokens.token": cookieToken,
    });
    if (!user) throw new Error();
    user.tokens.forEach((token) => {
      if (token.token === cookieToken) delete token.token;
    });
  } catch (e) {}

  res.clearCookie("token");
  res.clearCookie("loggedIn");
  res.redirect("back");
});

server.get("*", (req, res) => {
  res.status(404);
  res.render("404", { url: req.url });
});

const PORT = process.env.PORT;
server.listen(PORT);
