//passport/github.js
var GithubStrategy = require("passport-github").Strategy;
var models = require("../models");
var ghConfig = require("../gh.js");

module.exports = function(passport) {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: ghConfig.clientID,
        clientSecret: ghConfig.clientSecret,
        callbackURL: ghConfig.callbackUrl
      },

      // github will send back the tokens and profile
      function(access_token, refresh_token, profile, done) {
        models.User.findOrCreate({
          where: { github_auth_id: profile.id },
          defaults: {
            github_auth_id: profile.id,
            name: profile.displayName,
            role: "user",
            email: profile.email
          }
        })
          .spread((user, newUserCreated) => {
            console.log(
              user.get({
                plain: true
              })
            );
            done(null, user);
          })
          .catch(err => {
            console.log(err);
            return done(err, null);
          });
      }
    )
  );
};
