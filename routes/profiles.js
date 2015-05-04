var express = require("express");
var router = express.Router();
var profiles = require("../lib/profiles");
var Header = require("../lib/parts/header");

var templateData = {
    header: Header("Profiles", "List of profiles on the site."),
    list: profiles.getProfiles()
};


/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("profiles", templateData);
});

module.exports = router;
