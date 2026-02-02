const express = require('express')
const router = express.Router()

const {signupUser, loginUser} = require('../controller/userController')

//login
router.post('/login', loginUser)

//sign-up
router.post('/signup', signupUser)

module.exports = router