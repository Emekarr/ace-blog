const express = require("express");
const router = express.Router();
const {
  deleteFeedbacks,
  getFeedbacks,
} = require("../database/databasescripts");

router.post("/", async (req, res) => {
  await deleteFeedbacks(req.query.id, req.body.body);
  const feedbacks = await getFeedbacks();
  res.render("admin", { feedbacks });
});

module.exports = router;
