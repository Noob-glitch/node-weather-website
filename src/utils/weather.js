const request = require("request");
const weather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=238bcbddc3d29f420dc2f448da303e99&query=${latitude},${longitude}&units=f`;
  request({ url: url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      callback("unable to connect!", undefined);
    } else if (body.error) {
      callback("unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} Current temparature is:${body.current.temperature} and there is chance of raining is: ${body.current.precip}`
      );
    }
  });
};
module.exports = weather;
