const Categories = require("../models/categories.models")

const listcategories = async (req, res) => {
    // console.log("category", res.user);
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

const countActive = async (req,res) => {
    const categories = await Categories.aggregate([
        {
          $match: {
            "isActive" : true
          }
        },
        {
          $count: "NoOfCategories"
        }
        
      ])
      res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })
      console.log(categories);
}

const mostproducts = async (req,res) => {
    const categories = await Categories.aggregate([

        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "product"
            }
        },
        {
            $match: {
                product: { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "name": { $first: "$name" },
                "ProductsCount": {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                "ProductsCount": -1
            }
        },
        {
            $limit: 1
        }

    ])
      res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })
      console.log(categories);
} 

const getcategory = async (req, res) => {
    try {
        console.log(req.params.category_id);

        const category = await Categories.findById(req.params.category_id);
        console.log(category);

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category fetched sucessfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const totalProducts = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "product"
            }
        },
        {
            $match: {
                "product": { $ne: [] }
            }
        },
        {
            $unwind: {
                path: "$product"
            }
        },
        {
            $group: {
                _id: "$_id",
                "category_name": { $first: "$name" },
                "TotalProduct": {
                    $sum: 1
                },
                "product_name" : {$push : "$product.name"}
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const listInactive = async (req, res) => {

    const categories = await Categories.aggregate([
        {
            $match: {
                "isActive": false
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const countSubcategories = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
              from: "subcategories",
              localField: "_id",
              foreignField: "category_id",
              as: "subcategory"
            }
          },
          {
            $match: {
              "subcategory" : {$ne : []}
            }
          },
          {
            $unwind: {
              path: "$subcategory"
            }
          },
          {
            $group: {
              _id: "$_id",
              "category_name" : {$first : "$name"},
              "CountSubcategories": {
                $sum: 1
              },
              "subcategory_name" : {$push : "$subcategory.name"}
            }
          }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

const specificCategory = async (req, res) => {
    const categories = await Categories.aggregate([
        {
            $lookup: {
              from: "subcategories",
              localField: "_id",
              foreignField: "category_id",
              as: "subcategory"
            }
          },
          {
            $project: {
              "name" : 1,
              "subcategory" : 1
            }
          }
    ])

    res.status(200).json({
        success: true,
        message: "Category get  succesfully",
        data: categories
    })

    console.log(categories);

}

module.exports = {
    listcategories,
    addcategories,
    deletecategories,
    updatecategories,
    countActive,
    mostproducts,
    getcategory,
    totalProducts,
    listInactive,
    countSubcategories,
    specificCategory
}