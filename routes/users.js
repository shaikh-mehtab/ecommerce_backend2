const express = require('express');
const { signUp, signIn, signOut, getUser } = require('../controller/user');
const { isAuth } = require('../middleware/auth');
const router = express.Router();


router.post("/signup",signUp);
router.post('/signin',signIn);
router.get('/getuser',isAuth,getUser);
router.get('/signOut',isAuth,signOut);


module.exports= router

