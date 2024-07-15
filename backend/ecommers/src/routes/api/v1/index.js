const express = require("express");

const routes = express.Router();

const categoriesRoute = require("./categories.routs");
const subcategoriesRoute = require("./subcategories.routs");
const productsRoute = require("./products.routs");
const variantsRoute = require("./variants.routs");

routes.use("/categories", categoriesRoute)
routes.use("/subcategories", subcategoriesRoute)
routes.use("/products",productsRoute)
routes.use("/variant",variantsRoute)

module.exports = routes;


