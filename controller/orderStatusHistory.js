const orderStatusHistory = require('../models/orderStatusHistory');
const OrderStatusHistory = require('../models/orderStatusHistory');


const createOrderStatusHistory = async (orderId, status, note) => {
    try {
        const orderStatusHistory = new OrderStatusHistory({
            order: orderId,
            status: status,
            note: note
        });

        await orderStatusHistory.save();

        console.log('Order status history created:', orderStatusHistory);
    } catch (error) {
        console.error('Error creating order status history:', error);
    }
}

const getOrderStatusHistoryByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const history = await orderStatusHistory.find({ order: orderId }).sort({ updateAt: -1 });

        if (history.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No order status history found'
            });
        }

        res.status(200).json({
            status: true,
            history
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateOrderStatusHistory = async (req, res) => {
    try {
        const { status, note } = req.body;
        const historyId = req.params.id;

        const history = await OrderStatusHistory.findByIdAndUpdate(historyId, {
            status: status,
            note: note
        }, { new: true });

        if (!history) {
            return res.status(404).json({
                status: false,
                message: 'Order status history not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Order status history updated',
            history
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const deleteOrderStatusHistory = async (req, res) => {
    try {
        const historyId = req.params.id;
        const history = await OrderStatusHistory.findByIdAndDelete(historyId);

        if (!history) {
            return res.status(404).json({
                status: false,
                message: "Order status history not found"
            });
        }

        res.status(200).json({
            status: true,
            message: 'Order status history deleted'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const listAllOrderStatusHistory = async (req, res) => {
    try {
        const histories = await OrderStatusHistory.find().sort({ updateAt: -1 });

        if (histories.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No order status histories found'
            });
        }

        res.status(200).json({
            status: true,
            histories
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


module.exports = { createOrderStatusHistory, getOrderStatusHistoryByOrderId, updateOrderStatusHistory, listAllOrderStatusHistory,deleteOrderStatusHistory }