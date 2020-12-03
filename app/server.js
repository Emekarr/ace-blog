const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
// these functions perform database operations
const { createUser, logInUser } = require("./scripts/database/databasescripts");
// helps us use cookies
const cookieParser = require("cookie-parser");
//authentication middleware
const authMiddleware = require("./scripts/middleware/authentication");
// jsonwebtokem
const jwt = require("jsonwebtoken");
// user model
const User = require("./scripts/database/models/user");

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

server.get("/", (req, res) => {
  res.render("index");
});

server.get("/admin", (req, res) => {
  res.render("admin");
});

server.post("/admin", (req, res) => {
  res.send(req.body);
});

server.get("/contact", authMiddleware, (req, res) => {
  res.render("contact");
});

server.post("/contact", (req, res) => {
  res.send(req.body);
});

server.get("/login", (req, res) => {
  res.render("login");
});

server.post("/login", async (req, res) => {
  const cookies = req.cookies;
  const cookieToken = cookies.token;

  if (cookieToken) {
    const tokenData = jwt.verify(cookieToken, "supersecretkey");
    const userId = tokenData.id;
    const user = await User.findOne({
      _id: userId,
      "tokens.token": cookieToken,
    });
    if (user) return res.redirect("/");
  }

  const token = await logInUser(req.body);

  if (token) {
    res.cookie("token", token, { httpOnly: true });
  } else {
    res.render("authresult", { result: "failed", method: "Login" });
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
    res.render("authresult", {
      result: "was successful!",
      method: "registration ",
    });
  } else {
    res.render("authresult", { result: "failed!", method: "registration " });
  }
});

server.get("*", (req, res) => {
  res.status(404);
  res.render("404", { url: req.url });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
