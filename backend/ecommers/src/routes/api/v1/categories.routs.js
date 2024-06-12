const express = require("express");
const { categoriescontroller } = require("../../../controller");

const routes = express.Router();

routes.get(
    '/categories-list',  
    categoriescontroller.listcategories
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