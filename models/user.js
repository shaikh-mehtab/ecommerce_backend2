const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Name is required'],
        maxLength:[32,'Name Cannot be more than 32 characters']
    },
    email:{
        type:String,
        trim:true,
        required:[true,'Email is required'],
        unique:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is invalid']

    },
    password:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        trim:true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:[String],
        default:[]
    }
},{
    timestamps:true
});


module.exports = mongoose.model("User",userSchema); 