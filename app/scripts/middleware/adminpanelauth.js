const jwt = require("jsonwebtoken");
const User = require("../database/models/user");

const adminAuth = (req, res, next) => {
  const cookies = req.cookies;
  const token = cookies.token;

  try {
    if (!token) throw new Error();
    const tokenData = jwt.verify(token, "supersecretkey");
    const id = tokenData.id;
    const user = User.findOne({ _id: id, "tokens.token": token });
    if (user === null) throw new Error();
    if (user.isAdmin === true){
      console.log("passed")
      next()
    }else{
      
      throw new Error()
    };
  } catch (e) {
    res.render("authresult", {method:"access to this page", result:" is denied"});
  }

  
};

module.exports = adminAuth;
