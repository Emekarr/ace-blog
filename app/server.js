const express = require("express");
const path = require("path");

const viewsLocation = path.join(__dirname, "./templates/views");
const staticFilesLocation = path.join(__dirname, "./public");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", viewsLocation);

server.use(express.static(staticFilesLocation));

server.get("/", (req, res) => {
  const articles = [];
  res.render("index", { articles });
});

server.get("/admin", (req, res) => {
  res.render("admin");
});

server.get("/contact", (req, res) => {
  res.render("contact");
});

server.post("/contact", (req, res) => {
  res.send(req.body);
});

server.get("/login", (req, res) => {
  res.render("login");
});

server.post("/login", (req, res) => {
  res.send(req.body);
});

server.get("/signup", (req, res) => {
  res.render("signup");
});

server.post("/signup", (req, res) => {
  res.send(req.body);
});

server.get("*", (req, res) => {
  res.status(404);
  res.render("404", { url: req.url });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
