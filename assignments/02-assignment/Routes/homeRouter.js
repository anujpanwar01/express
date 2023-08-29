const express = require("express");
const path = require("path");

const fileDir = require("../helper/utils");
const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(path.join(fileDir, "views", "home.html"));
});
module.exports = router;
