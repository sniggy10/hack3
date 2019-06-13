const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/underdogs',function(err)
{
    if(err) {
        console.log(err);
        
    } else {
        console.log('database connected');
        
    }
});


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    contact: {type:Number, required:true, unique:true}
});

module.exports = mongoose.model('Users',userSchema);