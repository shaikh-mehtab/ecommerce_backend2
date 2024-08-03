const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    method: {
        type: String,
        required: [true, 'Shipping method is required'],
        trim: true
    },
    cost: {
        type: Number,
        required: [true, 'Shipping cost is required'],
        min: [0, 'Cost must be a positive number']
    },
    deliveryTime: {
        type: String,
        required: [true, 'Delivery time is required'],
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Shipping",shippingSchema);