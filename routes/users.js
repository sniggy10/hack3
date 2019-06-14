const express = require('express');
const router = express.Router(); 
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const app = express();
app.use(express.static(__dirname + '/public'));
const jwt = require('jsonwebtoken');


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////REGISTER////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/register', function(req, res){ 
    res.render("register.ejs")
})

router.post('/register', function(req, res){
    console.log(req.body.type);
    const newUser = new userModel({ 
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password,10),
        contact: req.body.contact
    });
    userModel.find({email:req.body.email}) 
    .exec() 
    .then(users=>{
        console.log(users)
        if(users.length>0){ 
            console.log("len")
            res.redirect('/login');
        }
        else{
            newUser.save();
            res.redirect('/login');
        }
    })
    .catch(err=>{
        res.send(err);
    })
}
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////LOGIN////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/login", function(req, res){
    res.render("login.ejs");
})
router.post('/login', function(req, res){
    userModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user===null){
            res.render("error-page");
        }
        else{
            if(bcryptjs.compareSync(req.body.password,user.password)){
                const token = jwt.sign( 
                    {
                        email: user.email, 
                        _id: user._id
                    },
                    'secret', 
                    {
                        expiresIn: '10s'
                    }
                );
                
               res.redirect('/land');
            }
            else
            res.render("/error-page");

        }
    })
    .catch(err=>{
        res.render("/error-page");
    })
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

router.get("/land", function(req, res){
    res.render("land.ejs")
})
router.get("/destination", function(req, res){
    res.render("destination.ejs")
})


module.exports = router;