const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        zipcode:{
            type:Number,
            required:true
        }
        ,image:{
            type:String
        }
    }
)

module.exports= mongoose.model('User', UserSchema)