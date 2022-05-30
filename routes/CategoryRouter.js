const express = require("express")
const router = express.Router()

const {getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/CategoryController")

router.get('/', getAllCategories)
router.post('/', createCategory)
router.get('/:id', getSingleCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router