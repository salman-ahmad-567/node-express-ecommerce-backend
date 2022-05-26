const express = require("express")
const router = express.Router()

const authenticate = require("../middlewares/Authentication")

const {
    register,
    login,
    logout
} = require("../controllers/AuthController")

router.post('/register', register)
router.post('/login', login)
router.get('/logout', authenticate, logout)

module.exports = router