var express = require("express");
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

/* GET home page. */
router.get("/", requiresAuth, function (req, res, next) {
  res.render("index", { title: "Container Apps Demo" });
});

module.exports = router;
