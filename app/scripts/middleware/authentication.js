const jwt = require("jsonwebtoken");
const User = require("../database/models/user");

const authmiddleware = async (req, res, next) => {
  const cookies = req.cookies;
  const token = cookies.token;

  try {
    if (token) {
      const tokenData = jwt.verify(token, process.env.JWT_KEY);
      const userId = tokenData.id;
      const user = await User.find({ _id: userId, "tokens.token": token });
      if (!user) throw new Error()
      req.body.userid = userId
      next()
    } else {
      throw new Error();
    }
  } catch (e) {
    res.render("authresult", {
      result: " failed becasue you are not loggedin",
      method: "Attempt to comment",
    });
  }
};

module.exports = authmiddleware;
