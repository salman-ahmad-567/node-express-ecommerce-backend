const mongoose = require("mongoose")

const ProductSchema = new mongoose.Mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide name.']
    },
    description:{
        type:String,
        required:false,
        default:''
    },
    price:{
        type: Number,
        required:[true, 'Please provide price.s']
    },
    image:{
        type: String,
        required:false
    }
})

const Product = ProductSchema.model('Product', ProductSchema)
module.exports = Product