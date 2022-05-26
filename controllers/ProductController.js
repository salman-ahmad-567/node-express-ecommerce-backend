const Product = require("../models/Product")

const getAllProducts = async(req, res)=>{
    try{
        res.send('Get All Products.')
    }
    catch(error){
        res.send(error)
    }
}

const createProduct = async(req, res)=>{
    try{
        res.send('Create Product.')
    }
    catch(error){
        res.send(error)
    }
}

const getSingleProduct = async(req, res)=>{
    try{
        res.send('Get SIngle Product')
    }
    catch(error){
        res.send(error)
    }
}

const updateProduct = async(req, res)=>{
    try{
        res.send('Update Product')
    }
    catch(error){
        res.send(error)
    }
}

const deleteProduct = async(req,res)=>{
    try{
        res.send('Delete Product')
    }
    catch(error){
        res.send(error)
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}