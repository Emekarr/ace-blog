const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("authresult", {
      result: " failed because this page is undone.",
      method: " attempt to get this page has",
    });
  });

module.exports = router
