const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const apiKey = "PUT YOUR KEY HERE";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      res.send("<h1>City not found</h1><a href='/'>Go back</a>");
      return;
    }
    response.on("data", (data) => {
      const weather = JSON.parse(data);
      const temp = weather.main.temp;
      const desc = weather.weather[0].description;
      const icon = weather.weather[0].icon;
      const img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.send("<h1>The temperature in " + city + " is " + temp + " C</h1><p>" + desc + "</p><img src='" + img + "'><br><a href='/'>Go back</a>");
    });
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
