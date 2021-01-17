const request = require("postman-request")

const forcast =  (locationQuery,callback) => {
    const weatherToken = "970c7688530555fd5139ce2a209b75d4";
    // const locationQuery = "37.8267,-122.4233";
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherToken}&query=${locationQuery}&units=m`;
    const weatherOptions = {
        url: weatherUrl,
        json: true,
      };
      request(weatherOptions, (err, res) => {
        if (err) {
          callback("Unable to connect to weather service");
        } else if (res.body.error) {
            callback("Unable to find location");
        } else {
          const { temperature, feelslike, weather_descriptions } = res.body.current;
          callback(
            undefined,`${weather_descriptions[0]}. It is currently ${temperature} deg. Feels like ${feelslike} deg`
          );
        }
      });

}

module.exports = forcast;