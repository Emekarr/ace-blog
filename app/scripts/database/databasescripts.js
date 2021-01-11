const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Feedback = require("./models/feedback");
const bcrypt = require("bcrypt");
const sendMail = require("../email/sendgrid");

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

const getPost = async ({ limit, page }) => {
  let results;

  try {
    const startFrom = (page - 1) * limit;
    results = await Post.find().limit(limit).skip(startFrom);

    delete results[0].views;
  } catch (e) {}

  return results;
};

const getAPost = async (title) => {
  let post;
  try {
    post = await Post.findOne({ title });
    if (!post) throw new Error();
    if (!post.views) {
      post.views = 1;
    } else {
      post.views += 1;
    }
    await post.save();
  } catch (e) {}

  return post;
};

const saveComment = (commentData) => {
  try {
    const comment = new Comment(commentData);
    comment.save();
  } catch (e) {}
};

const saveFeebdback = async (contact) => {
  const feedback = new Feedback(contact);
  let saved;
  try {
    const result = await feedback.save();
    if (!result) throw new Error();
    saved = true;
  } catch (e) {}

  return saved;
};

const getFeedbacks = async () => {
  let feedbacks;
  try {
    feedbacks = await Feedback.find();
  } catch (e) {}

  return feedbacks;
};

const deleteFeedbacks = async (id, message) => {
  const feedback = await Feedback.findByIdAndDelete(id);
  sendMail(feedback.email, message);
};

module.exports = {
  createUser,
  logInUser,
  createPost,
  getPost,
  getAPost,
  saveComment,
  saveFeebdback,
  getFeedbacks,
  deleteFeedbacks,
};
