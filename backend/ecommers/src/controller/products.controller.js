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
            {...req.body,
                product_img : {
                    public_id : fileRes.public_id,
                    url:fileRes.url
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

module.exports = {
    listproducts,
    getproducts,
    addproducts,
    deleteproducts,
    updateproducts
}