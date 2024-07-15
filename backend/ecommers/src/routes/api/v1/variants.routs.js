const express = require('express')
const { variantsController } = require('../../../controller')
const upload = require('../../../middelware/upload')
const router = express()

router.get(
    '/list-variant',
    variantsController.listVariants
)

router.get(
    '/list-variant/:variant',
    variantsController.getVariant
)

// router.get(
//     '/list-subcategory-by-category/:category_id',
//     variantsController.getSubcategory
// )

// router.get(
//     '/list-product-by-subcategory/:subcategory_id',
//     variantsController.getProductSelect
// )

router.post(
    '/add-variant',
    variantsController.addVariant
)

router.put(
    '/update-variant/:variant_id',
    variantsController.updateVariant
)

router.delete(
    '/delete-variant/:variant_id',
    variantsController.deleteVariant
)

module.exports = router