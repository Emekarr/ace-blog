const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const cookies = req.cookies;
  const token = cookies.token;

  try {
    if (token) {
        const tokenData = jwt.verify(token, "supersecretkey")
        const userId = tokenData.id
    } else {
      new Error()
    }
  } catch (e) {}
};

module.exports = authmiddleware;
