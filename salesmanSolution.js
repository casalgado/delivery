require("dotenv").config();
const axios = require("axios");
const bodyParser = require("body-parser");
const salesman = require("salesman.js");
const res = require("express/lib/response");
const express = require("express"),
  app = express(),
  port = 3070;

app.use(bodyParser.json());

require("./config/routes.js")(app);

app.listen(port, function (err) {
  console.log("running server on from port:::::::" + port);
});

let url = `https://maps.googleapis.com/maps/api/geocode/json?address=Barranquilla+Carrera+73+86-43&region=co&key=${process.env.GCP_API_KEY}`;
let banfi = `https://maps.googleapis.com/maps/api/geocode/json?address=Barranquilla+Carrera+49+74-109&region=co&key=${process.env.GCP_API_KEY}`;
let vicky = `https://maps.googleapis.com/maps/api/geocode/json?address=Barranquilla+cra+55+80-56&region=co&key=${process.env.GCP_API_KEY}`;
let abuchaibe = `https://maps.googleapis.com/maps/api/geocode/json?address=Barranquilla+cra+56+96-98&region=co&key=${process.env.GCP_API_KEY}`;
let galena = `https://maps.googleapis.com/maps/api/geocode/json?address=Barranquilla+calle+79+57-60&region=co&key=${process.env.GCP_API_KEY}`;

const getCoordinates = () => {
  try {
    return axios.get(url);
  } catch (error) {}
};

// getCoordinates().then((response) => {
//   console.log(response.data.results[0].geometry.location);
// });

const solver = () => {
  var points = [
    new salesman.Point(2.35, 3.12),
    new salesman.Point(2.39, 3.19),
    new salesman.Point(2.34, 3.11),
    new salesman.Point(2.35, 3.05),
  ];
  var solution = salesman.solve(points);
  var ordered_points = solution.map((i) => points[i]);
  console.log(solution);
};

solver();
