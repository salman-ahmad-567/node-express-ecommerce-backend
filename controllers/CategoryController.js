const { default: mongoose } = require("mongoose")
const Category = require("../models/Category")


const getAllCategories = async (req, res)=>{
    try{
        const categories = await Category.find({})
        res.status(200).json({ data: categories })
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const getSingleCategory = async (req, res)=>{
    try{
        const { id:categoryId } = req.params

        //check if the given id is valid (MUST USE RETURN Inside "IF" Statement sending a RESPONSE)
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({message: `No category with the given id - ${categoryId}`})
        }

        const category = await Category.findOne({_id:categoryId})

        //if no category is found send error
        if(!category){
            res.status(200).json({message: "No category found."})
        }

        //else send success response and data
        res.status(200).json({data: category})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const createCategory = async(req,res)=>{
    try{
        //Get data from request body
        const {name} = req.body

        //validate data (MUST USE RETURN Inside "IF" Statement sending a RESPONSE)
        if(!name){
            return res.status(400).json({error: 'Category name is required.'})
        }

        //create new category
        //MUST USE AWAIT
        const category = await Category.create({name})

        res.status(200).json({category})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const updateCategory = async(req, res)=>{
    try{
        //Get, destructure and re-name id to categoryId from request params 
        const {id: categoryId} = req.params

        //Get the Data from the Request
        const {name} = req.body

        //Validate the data (MUST USE RETURN Inside "IF" Statement sending a RESPONSE)
        //Validate id
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({message: `No category with the given id - ${categoryId}`})
        }
        //Validate Name
        if(!name){
            return res.status(400).json({error: 'Category name is required.'})
        }

        //get the category by id and update
        const category = await Category.findOneAndUpdate(
            {_id: categoryId},
            {name},
            {new: true, runValidators: true}
        )

        //return response
        res.status(200).json({data: category})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const deleteCategory = async (req, res)=>{
    try{
        //Get, destructure and re-name id to categoryId from request params 
        const {id: categoryId} = req.params

        //Validate id
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return res.status(400).json({message: `No category with the given id - ${categoryId}`})
        }

        //find the category and delete (Async Await)
        const category = await Category.findOneAndDelete({_id: categoryId})

        //Send Error, if No Category is found against the given ID
        //(MUST USE RETURN Inside "IF" Statement sending a RESPONSE)
        if(!category){
            return res.status(400).json({error: "No Category found."})
        }

        res.status(200).json({data: category})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}


module.exports = {getAllCategories, getSingleCategory, createCategory, updateCategory, deleteCategory}