var express = require("express");
var router = express.Router();
var Header = require("../lib/parts/header");

var templateData = {
    header: Header("Profiles", "List of profiles on the site."),
};

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
