var express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
//const methodOverride = require("method-override")
const app = express();
const port = 3005;
// app.use(express.static(__dirname + '/views'));
const users = require('./routes/users');

app.set("view engine", "ejs");

app.use(parser.json()); //should be written above below lines...parse json data
app.use(parser.urlencoded({extended:true}));
// app.set('views','./views');
//app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use('*', function(req, res, next){ // to alllow cors error //mdn cors
    res.set('Access-Control-Allow-Origin','*') //editing header
    res.set('Access-Control-Allow-Headers','content-type'); //for chrome
    next();
});
app.use(express.static(__dirname + '/public'));

app.use('/', users);

app.get('/', function(req, res){
    res.render("index");
})




app.listen(port, function(){
    console.log("SERVER INITIATED ON PORT 3005");
})