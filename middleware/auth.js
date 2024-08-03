const jwt = require('jsonwebtoken')
const User = require('../models/user')


const isAuth = async(req,res,next)=>{
    try {
        const {token} =req.cookies

        if(!token){
            return res.status(401).json({
                status:true,
                message:"Unauthorized User"
            });
        }

        const decodeData = jwt.verify(token,process.env.JWT_SECRET);
        
        req.user = await User.findById(decodeData._id)

        next();

    } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        });
    }
}


const isAdmin = async(req,res)=>{
    if(req.user.role !== 1){
        return res.status(401).json({
            status:false,
            message:"Admin only"
        });
    }

    next();
}


module.exports = {isAuth,isAdmin}