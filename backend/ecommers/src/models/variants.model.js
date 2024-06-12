const mongoose = require("mongoose");

//sub Schema
const attributesSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            lowercase : true,
            required : true,
        },
        value : {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required :  true
        },
        stock : {
            type : Number,
            required :  true
        },
    }
)

const variantSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true
        },
        attributes: [attributesSchema],
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Variants = mongoose.model("Variants", variantSchema)
module.exports = Variants