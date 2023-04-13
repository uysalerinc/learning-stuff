const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const querry = req.body.cityName;
    const apiKey = ""; // secret uwu
    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=" + apiKey + "&units=metric";
    https.get(weatherURL, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<head><meta charset = "utf-8"</head>');
            res.write("<h1>Temperature in Manisa is " + temp + " degrees</h1>");
            res.write("<p>Weather is currently " + weatherDesc + "</p>");
            res.write("<img src=" + imageURL + ">");

            res.send();
            
        })
    });
});
app.listen(3000, function(){
    console.log("Server is running on 3000 port.");
})