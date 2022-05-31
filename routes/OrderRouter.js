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
router.get('/my-orders', getCurrentUserOrders)

//Must define all /:id Routes in the END.

router.get('/:id', getSingleOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)


module.exports = router