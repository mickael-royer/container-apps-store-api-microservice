var express = require("express");
var router = express.Router();
var auth = require('../auth');

/* GET home page. */
router.get("/", auth, function (req, res, next) {
  res.render("index", { title: "Container Apps Demo" });
});

module.exports = router;
