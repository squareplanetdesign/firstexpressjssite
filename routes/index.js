var express = require("express");
var router = express.Router();
var Header = require("../lib/parts/header");
var User   = require("../lib/parts/user");
var util = require('util')

var templateData = {
    header: Header("Home Page", "Home Page"),
    user: null
};

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", templateData);
});

router.post("/login", function(req, res, next) {
    if (!req.body.txtUserName) {
        templateData.error = {
            frmLogin: {
                txtUserName: true
            },
            message: "User name is required!"
        };
    }
    User.login(req.body.txtUserName, function(err, userObj) {
        console.log(util.inspect(userObj));
        if (err) {
            templateData.error = {
                frmLogin: {
                    txtUserName: true
                },
                message: "Failed to login!\n" + err
            };
        } else {
            templateData.error = null;
            templateData.user = userObj;
        }

        res.render("index", templateData);
    })
});

function logout(req, res, next) {
    if (templateData.user) {
        templateData.user.logout(function(err) {
            templateData.user = null;
            res.render("index", templateData);
        })
    } else {
      res.render("index", templateData);
    }
}

router.post("/logout", logout);
router.get("/logout", logout);

module.exports = router;
