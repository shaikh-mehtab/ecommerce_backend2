const mongoose = require('mongoose');

const orderStatusHistorySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, 'Order is required']
    },
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
}, {
    timestamps: true
});

module.exports = mongoose.model("OrderStatusHistory",orderStatusHistorySchema);