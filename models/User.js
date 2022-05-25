const mongoose = require("mongoose")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the user."]
    },
    email: {
        type: String,
        required: [true, "Please provide email."]
    },
    password: {
        type: String,
        required: [true, "Password is required for the user."]
    }
})

// Create a Hashed Password to store in Password Field (Hash User Password) before saving new Record
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
})

//Verify Given Password against User's Hashed Password
UserSchema.methods.verifyPassword = async function(candidatePassword){
    const result = await bcrypt.compare(candidatePassword, this.password)
    return result
}

//Create JWT for User
UserSchema.methods.createJWT = function(){
    // D S E
    //Data, Secret, Expiry
    const token = jwt.sign(
        {id: this._id, name:this.name, email:this.email},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        } 
    )
    return token
}

//Verify Given Token against User's generated token
UserSchema.methods.verifyJWT = function(token){
    //T S
    //Token, Secret
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    return decoded
}

module.exports = mongoose.model('User', UserSchema)