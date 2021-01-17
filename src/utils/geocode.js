const request = require("postman-request");

const geocode = (address, callback) => {
  const geocodeToken =
    "pk.eyJ1IjoiYmFyYWtmIiwiYSI6ImNramJncWdibDdtbWkydnFqMDg1MDU0d3oifQ.lNWaq0tA3FRLqa0iHe3dhA";
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}?access_token=${geocodeToken}&limit=1`;
  const geocodeOptions = {
    url: geocodeUrl,
    json: true,
  };
  request(geocodeOptions, (err, res) => {
    if (err) {
      callback("Unable to connect to location services");
    } else if (res.body.features.length === 0) {
      callback("Unable to find location");
    } else {
      const { center, place_name:location } = res.body.features[0];
      const lat = center[1];
      const lon = center[0];

      callback("", { lat, lon, location });
    }
  });
};

module.exports = geocode;
