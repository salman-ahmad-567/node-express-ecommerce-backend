const Order = require("../models/Order")
const Product = require("../models/Product")
const mongoose = require("mongoose")

const getAllOrders = async(req, res)=>{
    try{
        const orders = await Order.find({}).populate('orderItems.product')
        res.status(200).json({data:orders})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const getSingleOrder = async(req, res)=>{
    try{
        //get id from request params
        const {id} = req.params

        //validate id (Must use Return statement)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "The given order id is invalid."})
        }

        //find order in the database (Must use Await)
        const order = await Order.findOne({_id:id})

        //if no order found return message (Must use RETURN)
        if(!order){
            return res.status(200).json({message: "No product found for given id."})
        }

        res.status(200).json({data: order})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const getCurrentUserOrders = async(req, res)=>{
    try{
        const orders = await Order.find({user: req.user.id})
        return res.status(200).json({data: orders})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const updateOrder = async(req, res)=>{
    try{
        //get status data from request
        const {status} = req.body

        //validate data
        if(!status){
            return res.status(400).json({error: "Status is required"})
        }
        if(status!=='paid' && status!=='delivered' && status!=='cancelled' && status!=='failed'){
            return res.status(400).json({error: "Status must be in ['paid', 'delivered', 'cancelled', 'failed']"})
        }

        //get order id from request
        const {id: orderId} = req.params

        //validate order id (Must use RETURN)
        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({error: "The given order id is invalid."})
        }

        // // FIRST APPROACH
        // //find the order from the database (Must use AWAIT)
        // const order = await Order.findOne({_id:orderId})

        // //If no order found then return messsage
        // if(!order){
        //     return res.status(200).json({message: "No product found with gven id."})
        // }

        // //save order status if the validation is passed
        // order.status = status
        // order.save()


        //--------------------------------------

        //SECOND APPROACH
        const order = await Order.findOneAndUpdate(
            {_id:orderId},
            {status: status},
            {new: true, runValidators:true}
        )

        res.status(200).json({data:order})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const deleteOrder = async(req, res)=>{
    try{
        //get order id from request
        const {id: orderId} = req.params

        //validate id
        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({error: "The given id is invalid."})
        }

        //find and delete order
        const order = await Order.findOneAndDelete({_id: orderId})

        //if order is not found return message
        if(!order){
            return res.status(200).json({message: "No order is found for given id."})
        }

        //return success response if validation is passed
        res.status(200).json({data:order})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}

const createOrder = async (req, res)=>{
    try{
        //get data from requet
        const {cartItems, shippingFee, tax} = req.body

        //validate data
        //MUST Use "RETURN" inside any IF statement returning a response
        if(!cartItems || cartItems.length < 1){
            return res.status(400).json({error: "No product in cart."})
        }

        if(!shippingFee || !tax){
            return res.status(400).json({error: "Tax and Shipping Fee are required."})
        }

        let subtotal = 0

        //MUST USE "ASYNC" before the CALLBACK function
        let orderItems = []

        for(const item of cartItems){
    
            //the "Item" is and Object containing 2 properties
                //1- Amount
                //2- Product-ID
            // Use the Product-ID to fetch Product data from the Database
            //Must use AWAIT
            const product = await Product.findOne({_id:item.id})
            //if product does not exist in database, RETURN error
            if(!product){
                return res.status(400).json({error: `Invalid product_id: ${item.id}`})
            }

            //destrucure properties of the PRODUCT object
            const {name, image, price, _id} = product

            //add product/s price to subtotal
            subtotal += (item.amount)*(price)

            //Prepare and return single ORDER_ITEM Object, acc. to SingleOrderItemSchema
            const singleOrderItem = {
                name,
                image,
                price,
                amount: item.amount,
                product: _id
            }
            
            orderItems = [...orderItems, singleOrderItem]
        }

        //return res.json({orderItems})
        
        //calculate Total
        const total = tax+shippingFee+subtotal

        //create Order
        const order = await Order.create({
            tax,
            shippingFee,
            subtotal,
            total,
            orderItems,
            user: req.user.id
        })

        res.status(200).json({data: order})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
}


module.exports = {
    getAllOrders,
    getSingleOrder, 
    getCurrentUserOrders, 
    updateOrder, 
    deleteOrder, 
    createOrder
}