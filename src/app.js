const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//for dynamic webpage
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
//for static webpage
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", function (req, res) {
  res.render("index", {
    title: "Weather App",
    name: "mirza",
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    title: "Weather App",
    name: "mirza",
  });
});

//static help page

// app.get("/help", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/help.html"));
// });

//dynamic help page
app.get("/help", function (req, res) {
  res.render("help", {
    title: "Weather App helpp pageX",
    name: "mirza",
  });
});

app.get("/weather", function (req, res) {
  console.log(req.query.address);
  if (req.query.address === "!") {
    res.send({
      error: { message: "wrong queries" },
    });
  } else if (!req.query.address) {
    res.send({
      error: { message: "please add search queries" },
    });
  } else {
    const location = req.query.address;

    geocode(location, (error, lat, lng) => {
      if (error) {
        res.send({ error });
      } else {
        forecast(lat, lng, (error, description, temp) => {
          if (error) {
            res.send({ error });
          }
          res.send({
            forecast: description,
            temp,
            location,
            lat,
            lng,
          });
        });
      }
    });
  }
});

app.get("/products", function (req, res) {
  if (!req.query.search) {
    res.send({
      products: { status: "please add search queries" },
    });
  }

  // res.send({
  //   forecast: "This is great shiny day",
  //   location: req.query.address,
  //   lat: JSON.parse(body).features[0].center[0],
  //   lng: JSON.parse(body).features[0].center[1],
  // });
});
//404
app.get("/help/*", (req, res) => {
  res.send("help article not found");
});

app.get("*", (req, res) => {
  // res.send("404");

  res.render("404", {
    title: "404",
    erMsg: "pg nt fnd",
  });
});
//404

app.listen(3000);
