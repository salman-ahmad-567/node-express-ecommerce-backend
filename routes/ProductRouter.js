const express = require("express");
const router = express.Router()

//Image uplaod
const path = require("path");
const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+'-' + file.originalname + path.extname(file.originalname) );
    }
});
const upload = multer({ storage })

const {
    getAllProducts,
    createProduct, 
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/ProductController.js")

router.get('/', getAllProducts)
router.post('/', upload.single('product-image'), createProduct)
router.get('/:id', getSingleProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router