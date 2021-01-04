const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// these functions perform database operations
const {
  createUser,
  logInUser,
  createPost,
  getPost,
  getAPost,
} = require("./scripts/database/databasescripts");
// helps us use cookies
const cookieParser = require("cookie-parser");
//authentication middleware
const authMiddleware = require("./scripts/middleware/authentication");
//authentication middleware for admin
const adminMiddleWare = require("./scripts/middleware/adminpanelauth");
// jsonwebtokem
const jwt = require("jsonwebtoken");
// user model
const User = require("./scripts/database/models/user");
//send grid
const sg = require("@sendgrid/mail");

//connect to a database
mongoose.connect("mongodb://127.0.0.1/ace-blog-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

server.get("/", async (req, res) => {
  const paginateData = { limit: req.body.limit, page: req.body.page };
  const results = await getPost(paginateData);
  res.render("index", { results });
});

server.get("/post", async (req, res) => {
  const post = await getAPost(req.query.title);
  res.render("blog", { post });
});

server.get("/admin", adminMiddleWare, (req, res) => {
  res.render("admin");
});

server.post("/admin", adminMiddleWare, async (req, res) => {
  const postData = req.body;
  const isSaved = await createPost(postData);

  if (isSaved) {
    res.render("authresult", { result: " succeeded", method: "Post creation" });
  } else {
    res.render("authresult", { result: " failed", method: "Post creation" });
  }
});

server.get("/about", (req, res) => {
  res.render("about");
});

server.get("/contact", (req, res) => {
  res.render("contact");
});

server.post("/contact", (req, res) => {
  res.send(req.body);
});

server.get("/updates", (req, res) => {
  res.render("authresult", {
    result: " failed because this page is undone.",
    method: " attempt to get this page has",
  });
});

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

  const tokenData = jwt.verify(cookieToken, "supersecretkey");
  const userId = tokenData.id;
  const user = await User.findOne({
    _id: userId,
    "tokens.token": cookieToken,
  });

  user.tokens.forEach((token) => {
    if (token.token === cookieToken) delete token.token;
  });

  res.clearCookie("token");
  res.clearCookie("loggedIn");
  res.redirect("/");
});

server.get("*", (req, res) => {
  res.status(404);
  res.render("404", { url: req.url });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
