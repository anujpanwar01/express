const express = require("express");
const path = require("path");

const appDir = require("../helper/utils");
const router = express.Router();

router.get("/users", function (req, res) {
  res.sendFile(path.join(appDir, "views", "users.html"));
});

module.exports = router;
