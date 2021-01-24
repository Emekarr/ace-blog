const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// helps us use cookies
const cookieParser = require("cookie-parser");

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

//route to send email to people who give feedback
server.use("/sendmail", require("./scripts/routes/sendMailRoute"))

//router for about
server.use("/about", require("./scripts/routes/aboutRoutes"))

//route to update page
server.use("/updates", require("./scripts/routes/updatesRoutes"))

//route to sign in to aceblog
server.use("/login", require("./scripts/routes/loginRoute"))

//route to sign up to aceblog
server.use("/signup", require("./scripts/routes/signUpRoute"))

//route to logout
server.use("/logout", require("./scripts/routes/logout"))

server.get("*", (req, res) => {
  res.status(404);
  res.render("404", { url: req.url });
});

const PORT = process.env.PORT;
server.listen(PORT);
