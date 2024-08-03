const express = require('express');
const { getOrderStatusHistoryByOrderId,
    updateOrderStatusHistory,
    listAllOrderStatusHistory,
    deleteOrderStatusHistory
} = require('../controller/orderStatusHistory');
const orderStatusHistoryRouter = express.Router();

orderStatusHistoryRouter.get('/order/:orderId/status-history', getOrderStatusHistoryByOrderId);
orderStatusHistoryRouter.put('/order/status-history/:id', updateOrderStatusHistory);
orderStatusHistoryRouter.get('/order/status-histories', listAllOrderStatusHistory);
orderStatusHistoryRouter.delete('/order/status-histories', deleteOrderStatusHistory);




module.exports = orderStatusHistoryRouter;