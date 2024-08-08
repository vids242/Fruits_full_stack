const Products = require("../models/products.models");
const uploadFiles = require("../utils/cloudinary");

const listproducts = async (req, res) => {
    try {
        const products = await Products.find();

        if (!products || products.length === 0) {
            res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Products fetched sucessfully",
            data: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const getproducts = async (req, res) => {
    try {
        // console.log(req.params.product_id);

        const product = await Products.findById(req.params.product_id);
        // console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const addproducts = async (req, res) => {
    try {
        console.log(req.body);
        // console.log(req.file);

        const fileRes = await uploadFiles(req.file.path, "Product")
        //    console.log(fileRes);
        const product = await Products.create({
            ...req.body,
            product_img: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        // console.log(product);

        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Product Crated sucessfully",
            data: product
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const deleteproducts = async (req, res) => {
    try {
        console.log(req.params.product_id);

        const product = await Products.findByIdAndDelete(req.params.product_id);
        // console.log(product);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted sucessfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}

const updateproducts = async (req, res) => {

    if (req.file) {
        console.log("New Image");

        const fileRes = await uploadFiles(req.file.path, "Product")
        //    console.log(fileRes);

        const product = await Products.findByIdAndUpdate(req.params.product_id,
            {
                ...req.body,
                product_img: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            },
            { new: true, runValidators: true }
        );

        // console.log(product);

        console.log(req.params);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })

    } else {
        console.log("Old Image");

        const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators: true });

        // console.log(product);

        console.log(req.params);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product not Update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Update sucessfully",
            data: product
        })
    }
    // try {
    //     console.log("acbd", req.params.product_id, req.body);

    //     const product = await Products.findByIdAndUpdate(req.params.product_id, req.body, { new: true, runValidators:true});
    //     // console.log(product);
    //     console.log(req.params);
    //     if (!product) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Product not Update"
    //         })
    //     }

    //     res.status(200).json({
    //         success: true,
    //         message: "Product Update sucessfully",
    //         data: product
    //     })

    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "Intenal server error." + error.message
    //     })
    // }
}

const searchName = async (req, res) => {

    const products = await Products.aggregate([
        {
            $match: {
                "name": /^[a-zA-Z0-9!@#$&()`.+,/"-]*$/
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsByCategory = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $project: {
                "name": 1,
                "product_img.url": 1,
                "category": 1
            }
        }

    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const productsBySubcategory = async (req, res) => {

    const products = await Products.aggregate([

        {
            $lookup: {
                from: "subcategories",
                localField: "subcategory_id",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: {
                path: "$subcategory"
            }
        },
        {
            $project: {
                "name": 1,
                "product_img.url": 1,
                "subcategory": 1
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const topRate = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "product_id",
                as: "review"
            }
        },
        {
            $unwind: {
                path: "$review"
            }
        },
        {
            $group: {
                _id: "$_id",
                "product_name": { $first: "$name" },
                "Totalrating": {
                    $sum: "$review.rating"
                }
            }
        },
        {
            $sort: {
                "Totalrating": -1
            }
        },
        {
            $limit: 1
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const newArrivals = async (req, res) => {

    const products = await Products.aggregate([
        {
            $sort: {
                "createdAt": -1
            }
        },
        {
            $limit: 3
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const countCategories = async (req, res) => {

    const products = await Products.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category"
            }
        },
        {
            $group: {
                _id: "$category._id",
                "category_name": { $first: "$category.name" },
                "product_name": { $push: "$name" },
                "TotalProduct": {
                    $sum: 1
                }
            }
        }
    ])

    res.status(200).json({
        success: true,
        message: "Products get  succesfully",
        data: products
    })

    console.log(products);

}

const searchData = async (req, res) => {
    try {
        const { sortOrder, rating, max, min, category, page, limit } = req.query
       

        
        const matchPip = {}

        if (rating) {
            matchPip['avgRating'] = { "$gte":  parseInt(rating) }
        }
        if (category) {
            matchPip['category_id'] = parseInt(category)
        }

        matchPip['variant.attributes.Price'] = {}

        if (min != undefined) {
            matchPip['variant.attributes.Price'].$gt = parseInt(min)
        }

        if (max != undefined) {
            matchPip['variant.attributes.Price'].$lte = parseInt(max)
        }

        // console.log(matchPip);

        const pipline = [
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "review"
                }
            },
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variant"
                }
            },
            {
                $addFields: {
                    avgRating: {
                        $avg: "$review.rating"
                    }
                }
            },
            {
                $unwind: {
                    path: "$variant"
                }
            },
            {
                $match: matchPip
            },
            {
                $group: {
                    _id: "$_id",
                    name: {
                        $first: "$name"
                    },
                    variant: {
                        $push: "$variant"
                    },
                    review: {
                        $push: "$review"
                    }
                }
            },
            {
                $sort: {
                    name: sortOrder === 'asc' ? 1 : -1
                }
            }
           
        ]

        if (parseInt(page) > 0 && parseInt(limit) > 0) {
            pipline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) })
            pipline.push({ $limit:  parseInt(limit) })
        }

        const data = await Products.aggregate(pipline)
      
        // console.log(JSON.stringify(data));


        res.status(400).json({
            success : true,
            message : "Product data fected",
            data : data
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success : false,
            message : "Inetrnal server error" + error
        })
    }
}

module.exports = {
    listproducts,
    getproducts,
    addproducts,
    deleteproducts,
    updateproducts,
    searchName,
    productsByCategory,
    productsBySubcategory,
    topRate,
    newArrivals,
    countCategories,
    searchData
}