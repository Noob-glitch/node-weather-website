//importing libraries
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");
//decalaring paths of directory which gonna be used later
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));
app.get("", (req, res) => {
  res.render("index", {
    title: "index",
    name: "Naveen",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    desc: "sorry",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    desc: "nothing",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error });
        weather(latitude, longitude, (error, weatherData) => {
          if (error) return res.send({ error });
          res.send({
            location: location,
            weather: weatherData,
          });
        });
      }
    );
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    desc: "help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    desc: "page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is runnning!");
});
