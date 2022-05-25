const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new Error('Unauthenticated')
    }

    token = req.token
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    
    if(!payload){
        throw new Error('Unauthenticated')
    }

    req.user = payload

    next()
}