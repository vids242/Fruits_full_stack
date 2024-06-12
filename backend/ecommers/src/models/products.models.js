const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Categories",
            required: true
        },

        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: "Subcategories",
            required: true
        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
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

const Products = mongoose.model("Products", productSchema)
module.exports = Products