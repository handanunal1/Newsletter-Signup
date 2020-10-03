const express = require("express");
const app = express();
const https = require("https");
const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=87a4be1d11c3da3b223c408f83984adf&units=metric";



app.get("/", function (req,res){


  https.get(url,function(response){
    console.log(response.statusCode);
    response.on('data',function(data){
      const weather = JSON.parse(data);
      console.log(weather);

      //  console.log(JSON.stringify(object));
      const description = weather.weather[0].description;
      const temp  = weather.main.temp;
      const icon = weather.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<p>The weather is currently " +description+"<p>");
      res.write("<h1> The temperature in London is "+temp+ " degrees Celcius</h1>");
      res.write("<img src="+iconUrl+ ">");
      res.send();


    })
  })
})


app.listen(3000, function () {

  console.log("Server is running on port 3000");

})
