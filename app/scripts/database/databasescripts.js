const User = require("./models/user");
const bcrypt = require("bcrypt");

const createUser = async (userDetails) => {
  let token;

  try {
    const user = new User(userDetails);
    const savedUser = await user.save();
    token = savedUser.generateToken();
  } catch (e) {}

  return token;
};

const logInUser = async ({ username, password }) => {
  let token;
  try {
    const user = await User.findOne({ username });
    const passedAuth = await bcrypt.compare(password, user.password);
    if (passedAuth) {
      token = user.generateToken();
    } else {
      new Error();
    }
  } catch (e) {}

  return token;
};

module.exports = {
  createUser,
  logInUser,
};
