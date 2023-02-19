//jshint esversion: 6
const express =require ("express");
const bodyParser =require("body-parser");
const request =require("request");
const app =express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
var firstName = req.body.name1;
var lastName = req.body.name2;
var email = req.body.email;
var data = {
  members: [
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME :firstName,
        LNAME :lastName
      }
    }
  ]
};
var jsonData =JSON.stringify(data);
var options = {
  url:"https://us14.api.mailchimp.com/3.0/lists/2f836bfb8d",
method:"POST",
headers: {
  "Authorization":"rayen a51369f98f33afbd4830f58bf93f4413-us14"
},
body:jsonData
};
request(options , function( error, response, body){
  if (error){
    res.send("there was an error with signing up ");
  } else{
    if(response.statusCode == 200){
    res.send("succesfully subscribed");
}else{
  res.send("there was an error with signing up ");
}
 }
  });


});

app.listen(process.env.PORT || 3000,function(){
  console.log("serveur is running ");
});

//a51369f98f33afbd4830f58bf93f4413-us14
