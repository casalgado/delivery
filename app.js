var express = require("express"),
  app = express(),
  port = 3070;

require("./config/routes.js")(app);

app.listen(port, function (err) {
  console.log("running server on from port:::::::" + port);
});
