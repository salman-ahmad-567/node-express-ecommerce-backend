const mongoose = require("mongoose")

const ProductSchema = new mongoose.schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the product."]
    },
    price: {
        type: Number,
        required: [true, "Please provide price for the product."]
    }
})


module.exports = mongoose.model('Product', ProductSchema)