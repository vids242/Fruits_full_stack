const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            lowercase : true,
            required : true,
        },
        email : {
            type : String,
            trim : true,
            unique : true,
            required : true,
        },
        password : {
            type : String
        },
        role : {
            type : String,
            trim : true,
            required : true,
        },
        refreshToken : {
            type : String,
        },
        googleId : {
            type : String,
        },
        isActive : {
            type :Boolean,
            default : true
        }
    },
    {
        timestamps : true,
        versionKey : false
    }
)

const Users = mongoose.model("Users", UsersSchema)
module.exports = Users