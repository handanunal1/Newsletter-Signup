const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req,res){
res.sendFile(__dirname+ "/index.html");

})

app.post("/",function(req,rest){
console.log(req.body.cityName);

const query = req.body.cityName;
const appId = "87a4be1d11c3da3b223c408f83984adf";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+units+"";



https.get(url,function(response){
  response.on('data',function(data){
    const weather = JSON.parse(data);
    console.log(weather);

    //  console.log(JSON.stringify(object));
    const description = weather.weather[0].description;
    const temp  = weather.main.temp;
    const icon = weather.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

    rest.write("<p>The weather is currently " +description+"<p>");
    rest.write("<h1> The temperature in "+query+" is "+temp+ " degrees Celcius</h1>");
    rest.write("<img src="+iconUrl+ ">");
    rest.send();


  })
})


})




app.listen(3000, function () {

  console.log("Server is running on port 3000");

})
