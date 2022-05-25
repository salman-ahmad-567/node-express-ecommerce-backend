const express = require("express")
const router = express.Router()

const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/ProductController.js")

router.get('/', getAllProducts)
router.post('/', createProduct)
router.get('/:id', getSingleProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router