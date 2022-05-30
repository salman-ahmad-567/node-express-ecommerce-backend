const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
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
        required:[true, 'Please provide price.']
    },
    image:{
        type: String,
        required:false
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        requied: true
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product