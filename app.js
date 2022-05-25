const express = require("express")
const app = express()

require('dotenv').config()

const ProductRouter = require("./routes/ProductRouter")

const connectDB = require("./db/connect.js")


app.use('/products', ProductRouter)



const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Database connected and App is listening on port ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}