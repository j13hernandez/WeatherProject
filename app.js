const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const APIkey = 'b40d9ecdfa1c3523f69e9cf70cf1080e';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const cityName = req.body.cityInput;
  https.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`,
    (response) => {
      response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<h1>The temperature in ${cityName} is ${temperature} degrees Celsius</h1>`);
        res.write(`<p> The weather is currently ${description}</p>`);
        res.write(`<img src='${imageURL}'/>`);
        res.send();
      });
    }
  );
});

app.listen(port, () => {
  console.log('Up Up');
});
