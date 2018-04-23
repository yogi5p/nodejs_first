const path = require("path");
const express = require("express");

const app = express(); //init our express app
//body-parser will take http request body and attach it
//to the request object automatticly for us
app.use(require("body-parser")());

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
