const express = require("express");
const router = express.Router();
const { saveFeebdback } = require("../database/databasescripts");

router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", async (req, res) => {
  const data = req.body;

  const result = await saveFeebdback(data);

  if (result) {
    res.render("authresult", { result: " was success", method: "feedback" });
  } else {
    res.render("authresult", { result: " failed", method: "feedback" });
  }
});

module.exports = router;
