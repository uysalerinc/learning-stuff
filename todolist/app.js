const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const listedItems = [];

const ItemsSchema = mongoose.Schema({
    name: String,
});

const listSchema = mongoose.Schema( {
    name: String,
    items: [ItemsSchema]
});

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("items", ItemsSchema);


Item.find().then(function (items){
    items.forEach(function(item){
        listedItems.push(item);
    });
}).catch(function(err) {
    console.log(err);
});

app.get("/", function(req, res){
    res.render("list", {day: "Today", newListItems: listedItems});
});

app.get("/:customListName", function(req, res){
    const customListName =  req.params.customListName;

    List.findOne({name: customListName}).then(function(list){
        if (!list) {
            const list = new List({
            name: customListName,
            items: []
    });
        list.save();
        console.log("Saved");
        res.redirect("/"+customListName);
    }else {
        res.render("list", {day:list.name, newListItems: list.items})};
})
.catch(function(err){});
});

app.post("/", function(req, res){
    const listName = req.body.day;
    const newItem = new Item({
        name: req.body.newItem,
    });
        newItem.save();
        listedItems.push(newItem);
        res.redirect("/");

})

app.post("/delete", function(req, res){
    const checkedItem = req.body.checkbox.trim();
    
    Item.findByIdAndRemove(checkedItem).then(function(foundItem){
        Item.deleteOne({_id:checkedItem})
    });
    res.redirect("/");
})

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(3000, function(){
    console.log("Server Started on port 3000");
});