const express = require('express');

const router = express.Router();

const {check} = require("express-validator");

const userControllers = require('../controllers/userController');

router.post('/register',[
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('password').isLength({min:6})

],userControllers.register_user);

router.post('/login',userControllers.user_login);

router.get('/getuser',userControllers.get_user)

router.delete('/deleteuser/:id',userControllers.delete_user)
 
module.exports = router;
