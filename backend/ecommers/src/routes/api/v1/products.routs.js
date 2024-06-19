const express = require("express");
const { productsController } = require("../../../controller");
const upload = require("../../../middelware/upload");

const routes = express.Router();

//localhost:3000/api/v1/products/list-products
routes.get(
    '/list-products',
    productsController.listproducts
)

routes.get(
    '/get-products/:product_id', 
    productsController.getproducts
)

routes.post(
    '/add-products', 
    upload.single("product_img"),
    productsController.addproducts
)

routes.put(
    '/update-products/:product_id', 
    upload.single("product_img"),
    productsController.updateproducts
)

routes.delete(
    '/delete-products/:product_id', 
    productsController.deleteproducts
)


module.exports = routes;