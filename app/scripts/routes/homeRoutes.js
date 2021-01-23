const express = require("express");
const router = express.Router();
const { getPost } = require("../database/databasescripts");

router.get("/", async (req, res) => {
  let limit = Number.parseInt(req.query.limit);
  let page = Number.parseInt(req.query.page);

  if (!limit || !page) {
    limit = 4;
    page = 1;
  }

  const paginateData = {
    limit,
    page,
  };

  const results = await getPost(paginateData);
  results.limit = limit;
  results.page = page + 1;
  res.render("index", { results });
});

module.exports = router;
