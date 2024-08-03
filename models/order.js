const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        city: {
            type: String,
            required: [true, 'City name is required']
        },
        state: {
            type: String,
            required: [true, 'State name is required']
        },
        country: {
            type: String,
            required: [true, 'Country is required']
        },
        postalCode: {
            type: String,
            required: [true, 'Postal code is required']
        }
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product is required']
            },
            name: {
                type: String,
                required: [true, 'Product name is required']
            },
            price: {
                type: Number,
                required: [true, 'Price is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required']
            }
        }
    ],
    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    paidAt: Date,
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    itemPrice: {
        type: Number,
        required: [true, 'Item price is required']
    },
    tax: {
        type: Number,
        required: [true, 'Tax price is required']
    },
    shippingCharges: {
        type: Number,
        required: [true, 'Shipping charges are required']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required']
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'delivered', 'canceled'],
        default: 'processing'
    },
    deliveredAt: Date,
    orderHistory: [
        {
            status: {
                type: String,
                enum: ['processing', 'shipped', 'delivered', 'canceled'],
                required: [true, 'Order status is required']
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
            note: {
                type: String,
                trim: true
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);

