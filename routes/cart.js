const express = require("express");
const { getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} = require("../controller/cart");
const cartRoutes = express.Router();

cartRoutes.get('/get', getCart);
cartRoutes.post('/add-cart', addToCart);
cartRoutes.put('/update-cart-item', updateCartItem);
cartRoutes.post('/remove-cart-item', removeCartItem);
cartRoutes.post('/clear-cart', clearCart);



module.exports = cartRoutes;