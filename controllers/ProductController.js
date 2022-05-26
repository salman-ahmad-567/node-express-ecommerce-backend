const { reset } = require("nodemon")
const Product = require("../models/Product")

const getAllProducts = async(req, res)=>{
    try{
        //Fetch products from Database (Await)
        const products = await Product.find({})
        
        //send products data in response
        res.status(200).json({data:products})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const createProduct = async(req, res)=>{
    try{
        //Fetch Data from Request
        const {name, price, description} = req.body

        //Validate the input data
        if(!name || !price || !description){
            return res.status(400).json({error: "incomplete data", data:req.body})
        }

        //Async Await, store product Data in the Database
        const product = await Product.create({name, price, description})

        //return success
        res.status(200).json({data: product})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const getSingleProduct = async(req, res)=>{
    try{
        //get Product id from Request params
        const productId = req.params.id

        //Find product in the Database (Async-Await) using the id
        const product = await Product.findOne({_id:productId})

        //If no product is found, send appropriate message
        if(!product){
            res.status(200).json({message:`No product found for given id ${productId}`})
        }

        //send product data, if product is found
        res.status(200).json({data: product})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const updateProduct = async(req, res)=>{
    try{
        //Get the input Data from the Request
        const {name, price, description} = req.body

        //Validate the input data
        if(!name || !price || !description){
            //Must use RETURN inside any if statement Sending a Response
            return res.status(400).json({error: "incomplete data", data:req.body})
        }

        //after validation
        
        //fetch the product id from the request params
        const productId = req.params.id

        //Fetch the product from the Database (Async-Await) and update it
        const updatedProduct = await Product.findOneAndUpdate(
            {_id:productId}, 
            {name, price, description},
            {new:true, runValidators:true}
        ) 

        //if no product is returned from the findOneAndUpdate, it means that the product doesnt exist for the given id
        if(!updatedProduct){
            //Must use RETURN from any if condition sending a response
            return res.status(200).json({message: `No product exists for the id ${productId}`})
        }
        
        //else return updated product in the response
        res.status(200).json({data:updatedProduct, message: "product updated"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const deleteProduct = async(req,res)=>{
    try{
        //get product id from request params
        const productId = req.params.id

        //FindOne and Delete the product from the Database (Async-Await) using the id
        const product = await Product.findOneAndDelete({_id:productId})

        //If no product is returned from the findOneAndDelete, it means the product doesnt exist fro the given id
        //return error message that the product doesnt exis
        if(!product){
            //Must usr RETURN inside the IF conditions sending a Response
            return res.status(200).json({message:`No product exists for the id ${productId}`})
        }

        //else, if the product exists and is deleted return success response
        res.status(200).json({data:product, message:"product deleted"})

    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}