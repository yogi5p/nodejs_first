//init.js in ("./passport")
var github = require("./github");
var models = require("../models");

module.exports = function(passport) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log("============== serializing user: ");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("============== DeSerializing user: ");
    models.User.find({
      where: {
        id: id
      }
    })
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err, null));
  });

  // Setting up Passport Strategies for Github
  github(passport);
};
