const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const app = express();
const passport = require('passport');

router.get('/destination',isLoggedIn,(req,res)=>{
    //console.log(req.user);
//     var novparts = new Array();
//     var ob = {};
//    Novels.find({'mainauthor.id': req.user._id},(err,novels)=>{
//         if(err){
//             console.log(err);
//         }else{
           
//             Parts.find({'collabauthor.id' : req.user._id }, (err,parts)=>{
//                 if(err){
//                     console.log(err);
//                 }else{
                    
//                     res.render('author/dashboard',{novels:novels, parts:parts }); 
//                 }});
//         }
//    });
    res.render("destination.ejs")
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////REGISTER////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', function(req, res){ 
    res.render("register.ejs")
})

router.post('/register',(req,res)=>{
   // console.log(req.body.password);
    var newUser = new userModel({username: req.body.username, email: req.body.email,contact: req.body.contact});
    userModel.register(newUser,req.body.password, (err,user)=>{
        if(err){
            console.log(err);
            res.redirect('/error')
        }
        passport.authenticate("local")(req,res, ()=>{
        res.redirect('/destination')
        })
    } );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////LOGIN////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/login", function(req, res){
    res.render("login.ejs");
})
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})
router.post('/login',passport.authenticate("local",{
    successRedirect: "/destination",
    failureRedirect: "/error"
}),(req,res)=>{
    
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////CONTACT/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/contact", function(req, res){
    res.render("contact.ejs")
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////LAND////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/error", function(req, res){
    res.render("error.ejs")
})


// router.get("/destination", function(req, res){
//     res.render("destination.ejs")
// })
function isLoggedIn(req,res,next){
    // console.log(req.isAuthenticated());
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect('/login');
 }

module.exports = router;