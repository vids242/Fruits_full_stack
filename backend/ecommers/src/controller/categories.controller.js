const Categories = require("../models/categories.models")

const listcategories = async (req, res) => {
    try {
        const categories = await Categories.find();

        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "categories not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "categories fatech succesfully",
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const getcategories = async () => {

}
const addcategories = async (req, res) => {
    try {


        const category = await Categories.create(req.body)
        // console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not Created"
            })
        }

        res.status(201).json({
            success: true,
            message: "Category Created succesfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const deletecategories = async (req, res) => {
    try {
        // console.log(req.params.category_id);

        const category = await Categories.findByIdAndDelete(req.params.category_id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Delete succesfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}
const updatecategories = async (req,res) => {
//    console.log("dhuwhfhf",req.params.category_id,req.body);
    try {
        const category = await Categories.findByIdAndUpdate(req.params.category_id,req.body,{new:true,runValidators:true})
       
        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Updated  succesfully",
            data: category
        })

    } catch (error) {   
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}


module.exports = {
    listcategories,
    getcategories,
    addcategories,
    deletecategories,
    updatecategories
}