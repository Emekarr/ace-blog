const express = require("express");
const router = express.Router();
const { getAPost, saveComment } = require("../database/databasescripts");

//authentication middleware
const authMiddleware = require("../middleware/authentication");

router.get("/", async (req, res) => {
  const post = await getAPost(req.query.title);
  await post.populate("comments").execPopulate();
  await post.populate("user").execPopulate();
  res.render("blog", { post });
});

router.post("/comment", authMiddleware, async (req, res) => {
  const post = await getAPost(req.query.title);
  const commentData = {
    user: req.body.userid,
    comment: req.body.message,
    username: req.body.username,
    post: post._id,
  };
  saveComment(commentData);

  res.redirect("back");
});

module.exports = router;
