const Cart = require("../models/cart");
const Product = require("../models/product");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;


        //find the cart for user 
        let cart = await Cart.findOne({ user: userId });

        //if cart not exist then create it.
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [], totalAmount: 0 });
        }

        const product = await Product.findById({ productId });
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }

        //check product already exist in cart or not
        const existingItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        //if exxist then update quantity and price
        if (existingItemIndex > -1) {
            cart.cartItems[existingItemIndex].quantity += quantity;
            cart.cartItems[existingItemIndex].price = product.price * cart.cartItems[existingItemIndex].quantity;
        } else {
            //not exist then add new product to cart
            cart.cartItems.push({
                product: productId,
                quantity,
                price: product.price * quantity
            });
        }

        cart.totalAmount = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

        await cart.save();

        res.status(200).json({
            status: false,
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = Cart.findOne({ user: userId }).populate('cartItems.product');

        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            status: true,
            cart,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                staus: false,
                message: "Cart not found"
            });
        }

        const product = await Product.findById({ productId });
        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }

        //check product already exist in cart or not
        const existingItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (existingItemIndex > -1) {
            cart.cartItems[existingItemIndex].quantity += quantity;
            cart.cartItems[existingItemIndex].price = product.price * cart.cartItems[existingItemIndex].quantity;
        }

        cart.totalAmount = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

        await cart.save();

        res.status(200).json({
            status: false,
            message: "Product update to cart",
            cart
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.body;

        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

        cart.totalAmount = cart.cartItems.reduce((total, item) => total + item.price, 0);

        await cart.save();

        res.status(200).json({
            status: true,
            message: "cart item removed",
            cart
        });


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        cart.cartItems = [];
        cart.totalAmount = 0;
        await cart.save();

        res.status(200).json({
            status: true,
            message: "Cart cleared",
            cart
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })

    }
}

module.exports = { addToCart, getCart, updateCartItem, removeCartItem, clearCart }