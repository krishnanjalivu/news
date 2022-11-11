const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res)
{
  const fname=req.body.firstname;
  const lname=req.body.secondname;
  const email=req.body.email;
  var data={
    members:[{
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]
  };
  var jsondata=JSON.stringify(data);
  const url="https://us21.api.mailchimp.com/3.0/lists/82f175cb24";
  const options={
    method:"post",
    auth:"krishna:01bf56f34a645f3e5c4b357b0a2399d0-us21",

  }
  const request=https.request(url,options,function(response)
{
  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();
});
app.post("/failure",function(req,res)
{
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("the server is running on port 3000");
})

// audience id 82f175cb24
// 01bf56f34a645f3e5c4b357b0a2399d0-us21   apikey
// "https://usx.api.mailchimp.com/3.0/lists"
