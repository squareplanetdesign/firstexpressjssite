var config = require("../../config");
var extend = require("extend");
var jf = require("jsonfile");


function _getProfilePath(userName) {
    return config.profilesPath + userName + ".json";
}

function User(userName) {
    this.authenticated = false;
    this.userName = userName;
    this.profile = {};
}

User.prototype = {
    logout: function(done) {
        this.authenticated = false;
        if (done) {
            done();
        }
    },
    loadProfile: function(done) {
        var self = this;
        var path = _getProfilePath(self.userName);

        jf.readFile(path, function(err, profile) {
            if (err) {
                if (done) {
                    done("Users profile can not be found: " + path + "\n" + err);
                }
            } else {
                this.profile = extend(self.profile, profile);
                if (done) {
                    done(false, self);
                }
            }
        });
    },
    saveProfile: function(done) {
        var self = this;
        var path = _getProfilePath(self.userName);

        jf.writeFile(path, this.profile, function(err) {
            if (done) {
                done(err);
            }
        });
    }
}

User.login = function(userName, done) {
    var user = new User(userName, done);
    user.loadProfile(done);
}

User.getCurrentUser = function() {
    return new User("Tom")
}


module.exports = User;
