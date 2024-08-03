const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
        trim: true,
        maxLength: [20, 'Coupon code cannot be more than 20 characters']
    },
    discount: {
        type: Number,
        required: [true, 'Discount amount is required'],
        min: [0, 'Discount must be a positive number']
    },
    validFrom: {
        type: Date,
        required: [true, 'Coupon start date is required']
    },
    validTo: {
        type: Date,
        required: [true, 'Coupon end date is required']
    },
    usageLimit: {
        type: Number,
        required: [true, 'Coupon usage limit is required'],
        min: [1, 'Usage limit must be at least 1']
    },
    usedCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Coupon",couponSchema);