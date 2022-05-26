const express = require("express")
const app = express()

const connectDB = require("./db/connect")
require("dotenv").config()

const AuthRouter = require("./routes/AuthRouter")
const ProductRouter = require("./routes/ProductRouter")

const authenticate = require("./middlewares/Authentication")

//To Accept JSON Data from REQUEST.BODY 
app.use(express.json())

app.use('/auth', AuthRouter)
app.use('/products', authenticate, ProductRouter)

const PORT = process.env.PORT || 3000

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`DB connected and App is listening on port ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()