const express = require("express");
const { createWishList, getWishList, getWishListById, updateWishList,deleteWishList } =require('../controller/wishlist');
const wishListRoutes = express.Router();
 
wishListRoutes.get('/get',getWishList);
wishListRoutes.post('/create',createWishList);
wishListRoutes.get('/get/:id',getWishListById);
wishListRoutes.put('/update',updateWishList);
wishListRoutes.delete('/delete',deleteWishList);



module.exports = wishListRoutes;