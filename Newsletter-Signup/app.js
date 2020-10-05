//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req,res){
res.sendFile(__dirname+ "/signup.html");
})


app.post("/",function(req,rest){
const  fName = req.body.firstName;
const  lName = req.body.lastName;
const  email = req.body.email;
console.log(fName,lName,email);

const data = {
  members:  [
{email_address: email,
 status: "subscribed",
 merge_fields: {
  FNAME: fName,
  LNAME: lName
  }
 }
]

//  --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \
};

const jsonData = JSON.stringify(data);
const url = "https://us2.api.mailchimp.com/3.0/lists/20c5209413";
const listId = "20c5209413";
const options = {
  method: "POST",
  auth: "handanunl:ee35c4437e7351a440fd254b097ffa3e-us2"

}

const request = https.request(url,options,function(response){
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();
});





app.listen(3000, function () {

  console.log("Server is running on port 3000");

});

//Api Key;
//ee35c4437e7351a440fd254b097ffa3e-us2

// Uniq audience id for the api : 20c5209413

//
