const express = require("express");
const router = express.Router();
const { getFeedbacks, createPost } = require("../database/databasescripts");

//authentication middleware for admin
const adminMiddleWare = require("../middleware/adminpanelauth");

router.get("/", adminMiddleWare, async (req, res) => {
  const feedbacks = await getFeedbacks();
  res.render("admin", { feedbacks });
});

router.post("/", adminMiddleWare, async (req, res) => {
  const postData = req.body;
  const isSaved = await createPost(postData);

  if (isSaved) {
    res.render("authresult", { result: " succeeded", method: "Post creation" });
  } else {
    res.render("authresult", { result: " failed", method: "Post creation" });
  }
});

module.exports = router;
