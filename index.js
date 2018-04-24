const path = require("path");
const express = require("express");
const Sequelize = require("sequelize");
var models = require("./models");
var passport = require("passport");

const app = express(); //init our express app
//body-parser will take http request body and attach it
//to the request object automatticly for us
app.use(require("body-parser")());

//Connect to your DB
const db = new sqlite.Database("./Pirates.sqlite", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("........Connected to The DeadSea, arrrrrrgh.");
});

//Configuring the app to use the right templeting engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.set("views", path.join(__dirname, "views")); //where are the views?
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.render("index"); //render the file in views named 'index'
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({ body: req.body });
});

app.listen(app.get("port"), () => {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});

app.get("/ship", (req, res) => {
  res.render("ship");
});

app.post("/pirate", (req, res) => {
  console.log(req.body);
  res.send("Thanks");
});

//Let's run a query to confirm
const query = `SELECT * from pirates`;
db.each(query, (err, row) => {
  if (err) throw err;
  console.log(row);
});

models.sequelize.sync().then(function() {
  app.listen(app.get("port"), () => {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press Ctrl-C to terminate."
    );
  });
});
