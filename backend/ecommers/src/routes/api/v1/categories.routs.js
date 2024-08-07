const express = require("express");
const { categoriescontroller } = require("../../../controller");
const validation = require("../../../middelware/validation");
const { categoryvalidation } = require("../../../validation");
// const auth = require("../../../middelware/auth");

const routes = express.Router();

routes.get(
    '/categories-list',
    // auth(["admin","employes"]),
    categoriescontroller.listcategories
)

routes.get('/count-active',
    categoriescontroller.countActive
)

routes.get('/most-products',
    categoriescontroller.mostproducts
)

routes.get(
    '/get-categories',
    validation(categoryvalidation.getCategory),
    categoriescontroller.getcategory
)

routes.get(
    '/total-products',
    categoriescontroller.totalProducts
)

routes.get(
    '/inactive',
    categoriescontroller.listInactive
)

routes.get(
    '/count-subcategories',
    categoriescontroller.countSubcategories
)

routes.get(
    '/category-subcategory/:category_id',
    categoriescontroller.specificCategory
)

routes.post('/categories-add',
    validation(categoryvalidation.addCategory),
    categoriescontroller.addcategories
)

routes.put('/categories-update/:category_id',
    validation(categoryvalidation.updateCategory),
    categoriescontroller.updatecategories
)

routes.delete('/categories-delete/:category_id',
    validation(categoryvalidation.deleteCategory),
    categoriescontroller.deletecategories
)



module.exports = routes;