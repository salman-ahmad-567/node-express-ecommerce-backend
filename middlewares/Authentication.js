const jwt = require("jsonwebtoken")

const authenticate = (req, res, next)=>{
    //1- Fetch Authorization Header from Request
    const authHeader = req.headers.authorization

    //2- Check if authHeader is present and Starts with 'Bearer '
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(400).json({"error": "Unauthorized. No Token present."})
    } 

    //3- If header is present and starts with bearer, then 
    // Fetch the Token from authHeader using the following Steps:
    // (convert authHeader string to an array using ' ' as a separator since authHeader has a format )
    // Bearer OIDISAODJ#&@EHHHHH89h32djjksdfn (i.e. 'Bearer token') so the second element at the index '1' of the 
    //splitted array will be the Token
    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {id: payload.userId, name:payload.name, email:payload.email}
        next()
    }
    catch(error){
        console.log(error)
        return res.status(400).json({"error": "Unauthorized. Invalid Token."})
    }
}

module.exports = authenticate