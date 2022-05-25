const Product = require("../models/Product")

const getAllProducts = async(req, res)=>{
    try{
        res.send("Get All Products")
    }catch(error){
        console.log(error)
    }
}

const createProduct = async(req, res)=>{
    try{
        res.send("Create Product")
    }catch(error){
        console.log(error)
    }
}

const getSingleProduct = async(req, res)=>{
    try{
        res.send("Get Single Product")
    }catch(error){
        console.log(error)
    }
}

const updateProduct = async(req, res)=>{
    try{
        res.send("Update Product")
    }catch(error){
        console.log(error)
    }
}

const deleteProduct = async(req, res)=>{
    try{
        res.send("Delete Product")
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}