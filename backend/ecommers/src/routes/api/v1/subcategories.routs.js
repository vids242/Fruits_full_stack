const express = require("express");
const { subcategoriescontroller } = require("../../../controller");

const routes = express.Router();

routes.get('/subcategorieslist',
    subcategoriescontroller.subcategorieslist

)
routes.get('/getsubcategories/:subcategory_id',
    subcategoriescontroller.getsubcategory
)

routes.get('/getsubCategorybyCategory/:category_id',
    subcategoriescontroller.getsubCategorybyCategory
)

routes.get('/count-active',
    subcategoriescontroller.countActive
)

routes.get('/most-products',
    subcategoriescontroller.mostproducts
)

routes.get(
    '/inactive', 
    subcategoriescontroller.countInactive
)

routes.get(
    '/count-products', 
    subcategoriescontroller.countProducts
)

routes.get(
    '/parent-of-subcategory/:category_id', 
    subcategoriescontroller.parentOfSubcategory
)

routes.post('/add-subcategories',
    subcategoriescontroller.addsubcategory

)
routes.put('/put-subcategories/:subcategory_id',
    subcategoriescontroller.putsubcategories
)

routes.delete('/delete-subcategories/:subcategorydelete_id',
    subcategoriescontroller.deletesubcategory
)


module.exports = routes;