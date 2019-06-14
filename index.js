var express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
//const methodOverride = require("method-override")
const app = express();
const port = 3008;
// app.use(express.static(__dirname + '/views'));
const users = require('./routes/users');
const morgan=require('morgan')
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');
const User=require('./models/userModel');
mongoose.connect('mongodb://localhost/underdogs',function(err)
{
    if(err) {
        console.log(err);
        
    } else {
        console.log('database connected');
        
    }
});


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





app.use(require('express-session')({
    secret: "underDOG",
    resave: false,
    saveUninitialized: false
}));
app.use(parser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+'/public'));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

app.use(morgan('dev'));
app.use('/', users);

app.get('/', function(req, res){
    res.render("index");
})




app.listen(port, function(){
    console.log("SERVER INITIATED ON PORT 3003");
})