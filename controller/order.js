const Order = require('../models/order');
const Cart = require('../models/cart');


const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { shippingInfo, paymentMethod, paymentInfo } = req.body;

        //ceheck login user
        const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.cartItem.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Cart is empty"
            });
        }

        //map multiple order
        const orderItems = cart.cartItems.map(item => ({
            product: item.product,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const totalAmount = cart.totalAmount;

        //create order
        const order = new Order({
            user: userId,
            orderItems,
            shippingInfo,
            paymentMethod,
            paymentInfo,
            itemPrice: totalAmount,
            tax: req.body.tax,
            shippingCharges: req.body.shippingCharges,
            totalAmount: totalAmount + req.body.tax + req.body.shippingCharges,
            orderStatus: 'processing'
        });

        await order.save();

        //after order clear cart
        await Cart.findOneAndUpdate({ user: userId }, { cartItems: [], totalAmount: 0 });


        res.status(200).json({
            status: true,
            message: "Order Created Successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getUserOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId }).populate('orderItems.product');

        res.status(200).json({
            status: true,
            orders
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user orderItems.product');

        if (orders.length === 0) {
            res.status(404).json({
                status: false,
                message: "No any order found"
            });
        }

        res.status(200).json({
            status: true,
            orders,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status, note } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        order.orderStatus = status;
        order.orderHistory.push({ status, note });

        if (status == 'delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.status(200).json({
            status: true,
            message: "Order status updated",
            order
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Order deleted"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = { createOrder, getUserOrder, getAllOrders, updateOrderStatus,deleteOrder }