const path = require("path");
const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;

const app = express(); //init our express app

// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require("./passport/init");
initPassport(passport);

//Configuring the app to use the right templeting engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("views", path.join(__dirname, "views")); //where are the views?
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

//body-parser will take http request body and attach it
//to the request object automatticly for us
// Put these statements before you define any routes.
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

let gh_auth = passport.authenticate("github", { failureRedirect: "/login" });
// let local_auth = passport.authenticate("local", { failureRedirect: "/login" });

//Custom Middleware

/* this checks to see passport has deserialized 
and appended the user to the request */
const isAuth = (req, res, next) => {
  console.log("=======Authorization Check");
  if (req.user) {
    return next();
  } else return res.render("login", {});
};

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// register Github routes index.js
app.get("/login/github", passport.authenticate("github"));

app.get(
  "/login/github/callback",
  passport.authenticate("github", { failureRedirect: "/pirates" }),
  function(req, res) {
    res.redirect("/users");
  }
);

app.get("/users", (req, res) => {
  models.User.findAll().then(function(data) {
    res.render("users", {
      users: data
    });
  });
});

app.get("/profile", isAuth, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("profile", {
    user: req.user
  });
});

//Routing Town!!!
app.get("/", (req, res) => {
  models.Pirate.findAll({ order: [["updatedAt", "DESC"]] })
    .then(data => res.render("pirates", { pirates: data }))
    .catch(error => {
      res.status("409");
      res.send(err.send);
    });
});

app.post("/", (req, res) => {
  console.log(req.body);

  //take req.body and save it to the database!
  //then return saved object with status 201
  res.send({ name: req.body });
});

app.get("/pirate", (req, res) => {
  res.render("pirate-form");
});

app.post("/pirate", (req, res) => {
  console.log(req.body);
  //insert into the DB
  if (req.body.family_name !== "") {
    models.Pirate.create(req.body)
      .then(data => {
        res.status("200");
        //res.send(data.body);
        res.redirect("/");
      })
      .catch(error => res.sendStatus("409"));
  } else {
    res.status("400");
    res.statusMessage("Bad Request family name is empty");
  }
});

//Finally setting the app to listen gets it going
// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function() {
  app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });
});
