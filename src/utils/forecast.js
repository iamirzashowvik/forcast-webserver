const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lon +
    "&lon=" +
    lat +
    "&appid=f3e03662b2d586eda3644a9a0af01c40";

  request(url, function (error, response, body) {
    callback(
      error,
      JSON.parse(body).weather[0].description,
      JSON.parse(body).main.temp
    );
  });
};

module.exports = forecast;
