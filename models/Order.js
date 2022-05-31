const mongoose = require("mongoose")

const OrderItemSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    //image:{ type:String, required: true },
    price: {type: Number, required: true},
    amount: { type: Number, required: true },
    product:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

const OrderSchema = new mongoose.Schema({
    tax:{ type:Number, required: true},
    shippingFee: {type: Number, required: true},
    subtotal: {type: Number, required: true},
    total: {type:Number, required: true},
    status: {type:String, required:true, enum:['pending', 'failed', 'cancelled', 'delivered', 'paid'], default:'pending'},
    orderItems:[OrderItemSchema],
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    }
}, {timestamps:true})


const Order = mongoose.model('Order', OrderSchema)

module.exports = Order