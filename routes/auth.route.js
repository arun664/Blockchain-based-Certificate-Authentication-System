const express = require('express')
const router = express.Router()

//Validation
const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')

//Load controllers
const {
    registerController,
    loginController,
    activationController,
    forgotPasswordController,
    resetPasswordController
}   = require('../controllers/auth.controller.js')

router.post('/register', validSign, registerController)
router.post('/login', validLogin, loginController)
router.post('/activation', activationController)
router.put('/password/forget', forgotPasswordValidator, forgotPasswordController)
router.put('/password/reset', resetPasswordValidator, resetPasswordController)
module.exports = router