//Link to Website https://currentweather2.azurewebsites.net/
var express = require("express");
var weather = require("weather-js");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(express.static('public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true}));
app.use(cors());
app.use(express.static("public"));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/temperature', (req, res) =>{
  weather.find({search: req.body.location, degreeType: 'F'}, (err, ans) => {
    if(err){
      res.json(err);
    }
    var result = ans[0].current.temperature;
    res.json(result);
  });
})

app.post('/api/userLocation', (req, res) =>{
  weather.find({search: req.body.location, degreeType: 'F'}, (err, ans) => {
    if(err){
      res.json(err);
    }
    var result = ans[0].current;
    res.json(result);
  });
})

var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});