const express = require('express')
const app = express()
const request = require('request');
const bodyParser = require('body-parser');
const apiKey = '35ee21fdfc2c78161a7dff40342acc64'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
          res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
              res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
              let weatherText = `It's ${weather.main.temp} Celcius Degree in ${weather.name}!`;
              res.render('index', {weather: weatherText, error: null});
            }
          }
        });
  })


app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
      })