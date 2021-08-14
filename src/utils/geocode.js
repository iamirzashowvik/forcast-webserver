const request = require("request");

const geocode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?access_token=pk.eyJ1IjoiaW1pcnphc2hvd3ZpayIsImEiOiJja3JuOGVvdXQwdWoyMnZub3ZiMGJ6ZTVqIn0.qRiIUSI7gGdhdUsCdDTHiw";
  request(url, function (error, response, body) {
    console.log(body, error);
    callback(
      error,
      JSON.parse(body).features[0].center[0],
      JSON.parse(body).features[0].center[1]
    );
  });
};

module.exports = geocode;
