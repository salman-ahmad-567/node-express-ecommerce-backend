const User = require("../models/User")
const StatusCodes = require("http-status-codes")

const register = async (req, res)=>{
    try{
        //fetch data from request (MUST USE CONST)
        const {name, email, password} = req.body
        
        //validations
        if(!name || !email || !password){
            //MUST USE RETURN (or else Error is caused: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)
            return res.status(400).json({ "error":"Incomplete Data", "data":req.body })
        }

        //save data (MUST USE AWAIT)
        const user = await User.create({name, email, password})

        //create token
        const token = user.createJWT()

        //send response (user_data and token)
        res.status(200).json({
            "data": user,
            "token":token
        })
    }
    catch(error){
        console.log(error)
        res.json({error})
    }
}


const login = async (req, res)=>{
    try{
        //fetch data from request (MUST USE CONST)
        const {email, password} = req.body
        
        //Validate Data
        if(!email || !password){
            //MUST USE RETURN (or else Error is caused: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)
            return res.status(400).json({"error":"Email and Password are required", "data":req.body })
        }

        //Fetch User from Database (MUST USE AWAIT)
        const user = await User.findOne({email})

        //if user doenst exists for that email send error
        if(!user){
            //MUST USE RETURN (or else Error is caused: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)
            return res.status(404).json({"error":"Incorrect Email.", "data":req.body})
        }

        //compare password, if user is found 
        //(MUST USE AWAIT)
        const isMatch = await user.comparePassword(password)

        //if password doesnt match send error
        if(!isMatch){
            //MUST USE RETURN (or else Error is caused: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)
            return res.status(401).json({"error":"Incorrect password", "data":req.body})
        }

        //else, if user exists for given email and given password is matched with user's password, Create Token and send success response
        //create token
        const token = user.createJWT()

        //send success response
        res.status(200).json({user, token, isMatch: isMatch})
    }
    catch(error){
        console.log(error)
        res.json({error})
    }
}

const logout = async(req, res)=>{
    try{
        await res.send('Logout')
    }
    catch(error){
        console.log(error)
        res.json({error})
    }
}

module.exports = {
    register,
    login,
    logout
}