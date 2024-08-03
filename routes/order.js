const express = require('express');
const { createOrder,
    getUserOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} = require('../controller/order');
const orderRoutes = express.Router();


orderRoutes.post('/create', createOrder);
orderRoutes.get('/get-user', getUserOrder);
orderRoutes.get('/get-all', getAllOrders);
orderRoutes.put('/update', updateOrderStatus);
orderRoutes.delete('/delete', deleteOrder);


module.exports = orderRoutes;