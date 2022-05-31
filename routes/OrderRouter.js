const express = require("express")
const router = express.Router()

const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/OrderController.js")

router.get('/', getAllOrders)
router.post('/', createOrder)
router.put('/update-order-status', updateOrder)
router.get('/:id', getSingleOrder)
router.get('/my-orders', getCurrentUserOrders)
router.delete('/:id', deleteOrder)


module.exports = router