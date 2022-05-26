const mongoose = require("mongoose")
const bcrypt = require("bcryptjs/dist/bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name of the user.']
    },
    email:{
        type: String,
        required:[true, 'Please provide email.'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'Please provide password.']
    },

})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

UserSchema.methods.createJWT = function(){
    const token = jwt.sign(
        {userId:this._id, name: this.name, email:this.email},
        process.env.JWT_SECRET,
        {expiresIn:'30d'}
    )
    return token
}

const User = mongoose.model('User', UserSchema)
module.exports = User