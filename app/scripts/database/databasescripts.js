const User = require("./models/user");
const Post = require("./models/post");
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

const createPost = async (postData) => {
  let saved;
  try {
    const post = new Post(postData);
    await post.save();
    saved = true;
  } catch (e) {}

  return saved;
};

const getPost = async ({limit, page}) => {
  let results;

  try {
    if (!limit || !page) {
      limit = 4;
      page = 1;
    }
    const startFrom = (page - 1) * limit;
    results = Post.find().limit(limit).skip(startFrom);
  } catch (e) {}

  return results;
};

module.exports = {
  createUser,
  logInUser,
  createPost,
  getPost,
};
