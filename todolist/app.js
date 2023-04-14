const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let items = [];

app.get("/", function(req, res){
    let day = date.getDay();
    res.render("list", {day: day, newListItems: items});
});

app.post("/", function(req, res){
    items.push(req.body.newItem);

    res.redirect("/");

})

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(3000, function(){
    console.log("Server Started on port 3000");
});