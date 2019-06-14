const mongoose = require('mongoose');

//  mongoose.connect('mongodb://localhost/underdogs',function(err)
// {
//     if(err) {
//         console.log(err);
        
//     } else {
//         console.log('database connected');
        
//     }
// });

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   
    username: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String},
    contact: {type:Number, required:true, unique:true}
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users',userSchema);