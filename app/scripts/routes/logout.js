const express = require("express");
const router = express.Router();

// jsonwebtokem
const jwt = require("jsonwebtoken");
// user model
const User = require("../database/models/user");

router.get("/logout", async (req, res) => {
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

module.exports = router;
