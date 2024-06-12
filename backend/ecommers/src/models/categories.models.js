const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            lowercase : true,
            unique : true,
            required : true,
        },
        discription : {
            type : String,
            trim : true,
            required : true,
        },
        image : {
            type : String,
            trim : true,
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

const Categories = mongoose.model("Categories", CategorySchema)
module.exports = Categories