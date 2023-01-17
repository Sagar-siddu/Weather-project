const express = require("express");
const https = require("https");
const bp = require("body-parser");
const app = express();
app.use(bp.urlencoded({exyended: true}));

//get
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

//post
app.post("/",function(req,res){
  var q = req.body.city;
  var id = "8340cddcb45b553c9476cf8343f93b12";
  var uni = "metric"
  var url="https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid="+id+"&units="+uni;

  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const wd = JSON.parse(data)
      const temp = wd.main.temp;
      const dec = wd.weather[0].description;
      const icon = wd.weather[0].icon;
      const imgurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>Temp in hyd is : "+temp+" Degrees celcius</h1>")
      res.write("<h2>Its "+dec+" in here</h2>")
      res.write("<img src="+imgurl+">")
      res.send();
    });

  });

});





app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});
