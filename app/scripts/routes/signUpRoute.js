const express = require("express");
const router = express.Router();
const { createUser } = require("../database/databasescripts");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", async (req, res) => {
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

module.exports = router;
