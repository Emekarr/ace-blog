const express = require("express");
const router = express.Router();
const { logInUser } = require("../database/databasescripts");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const token = await logInUser(req.body);
  if (token) {
    res.cookie("token", token, { httpOnly: true });
    res.cookie("loggedIn", true);
    res.redirect("/");
  } else {
    res.render("authresult", { result: " failed", method: "Login" });
  }
});

module.exports = router;
