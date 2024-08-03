const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: [1, 'Quantity must be at least 1']
            },
            price: {
                type: Number,
                required: [true, 'Price is required']
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart",cartSchema);