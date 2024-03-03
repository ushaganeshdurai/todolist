const express = require("express");
const mongoose = require("mongoose"); // require mongoose
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
//create a todolistDB database and connect it
mongoose.connect("mongodb://127.0.0.1/todolistDB", { useNewUrlParser:
true });
//create a Schema of only name feild
const itemSchema = new mongoose.Schema({
name: String,
});
const Item = mongoose.model("Item", itemSchema); // create a model of Items
const Item1 = new Item({
name: "Wake up at 6:30",
});
const Item2 = new Item({
name: "Check your notebooks",
});
const Item3 = new Item({
name: "Catch the bus at 7:30",
});
const Item4 = new Item({
name: "Get to college"
});
const defaultItems = [Item1, Item2, Item3, Item4]; // create a array of items doc
const listSchema={
name:String,
items:[itemSchema]
}
const List = mongoose.model("List",listSchema)
app.get("/", function (req, res) {
Item.find({}).then(function (foundItems) {
if (foundItems.length === 0) {
Item.insertMany(defaultItems)
.then(function () {
console.log("Successfully saved defult items to DB");
})
.catch(function (err) {
console.log(err);
});
res.redirect("/");
}else{
const weekday =
["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = weekday[d.getDay()];
res.render("list", { listTitle: day, newListItems: foundItems });
}
});
});
app.post("/", function (req, res) {
const itemName = req.body.newItem;
const item=new Item({
name:itemName
});

item.save();
res.redirect("/");
});
app.listen(3000, function () {
console.log("Server started on port 3000");
});