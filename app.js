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

// getCoordinates().then((response) => {
//   console.log(response.data.results[0].geometry.location);
// });

const array = [url, banfi, vicky, abuchaibe, galena];
let coordinates = [];
let promises = [];
for (i = 0; i < array.length; i++) {
  promises.push(
    axios.get(array[i]).then((response) => {
      // do something with response
      coordinates.push(response.data.results[0].geometry.location);
    })
  );
}

Promise.all(promises).then(() => {
  let zeroX = 11.0190996;
  let zeroY = -74.8113399;
  var points = [];
  console.log(coordinates[0].lat);

  coordinates
    .map((e) => {
      return {
        x: Math.floor((e.lat - zeroX) * 1000000),
        y: Math.floor((e.lng - zeroY) * 1000000),
      };
    })
    .forEach((e) => {
      points.push(new salesman.Point(e.x, e.y));
    });
  var solution = salesman.solve(points);
  var ordered_points = solution.map((i) => points[i]);
  console.log(ordered_points);
});

const solver = () => {
  var points = [
    new salesman.Point(0, 0),
    new salesman.Point(2, 3),
    new salesman.Point(-2, -3),
    new salesman.Point(3, 4),
    new salesman.Point(-3, -4),
    new salesman.Point(2, 5),
    new salesman.Point(2, -5),
  ];
  var solution = salesman.solve(points);
  var ordered_points = solution.map((i) => points[i]);
  console.log(ordered_points);
};
