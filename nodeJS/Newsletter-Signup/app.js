const express = require('express');
const bodyParser = require('body-parser');
const rqst = require('request');
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var surname = req.body.surname;
    var email = req.body.emailadress;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: surname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://usX.api.mailchimp.com/3.0//lists/{list-id here}";
    const apiKey = "";

    const options = {
        method: "POST",
        auth: "username:" +apiKey
    }

    const request = https.request(url, options, function(respone){
        respone.on("data", function(data){
            if (respone.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html")
            }

        })

    })

   // request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is runnig on 3000 port");
});