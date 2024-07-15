const express = require("express");
const { categoriescontroller } = require("../../../controller");

const routes = express.Router();

routes.get(
    '/categories-list',
    categoriescontroller.listcategories
)

routes.get('/count-active',
    categoriescontroller.countActive
)

routes.get('/most-products',
    categoriescontroller.mostproducts
)

routes.get(
    '/get-categories/:category_id',
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
    categoriescontroller.addcategories
)

routes.put('/categories-update/:category_id',
    categoriescontroller.updatecategories
)

routes.delete('/categories-delete/:category_id',
    categoriescontroller.deletecategories
)



module.exports = routes;