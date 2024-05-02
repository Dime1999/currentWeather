//Link to Website https://currentweather2.azurewebsites.net/

//Lines 4 to 8 include the list of enabled npm packages.
var express = require("express");
var weather = require("weather-js");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(express.static('public'));  // to link the css code to the rest of the website

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true}));
app.use(cors());
app.use(express.static("public"));

//Deploys the HTML file to the server while being linked to the CSS and JS API
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//Lines 25 to 33 takes the request of the user given location and returns it current temperature.
app.post('/api/temperature', (req, res) =>{
  weather.find({search: req.body.location, degreeType: 'F'}, (err, ans) => {
    if(err){
      res.json(err);
    }
    var result = ans[0].current.temperature;
    res.json(result);
  });
})

//Lines 36 to 44 takes the request of the user given location and returns the full weather data.
app.post('/api/userLocation', (req, res) =>{
  weather.find({search: req.body.location, degreeType: 'F'}, (err, ans) => {
    if(err){
      res.json(err);
    }
    var result = ans[0].current;
    res.json(result);
  });
})


//Used to create a local server to display the website.
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
