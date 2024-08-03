const express = require('express');
const { getAddress,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} = require('../controller/address');
const addressRoutes = express.Router();

addressRoutes.get('/get', getAddress);
addressRoutes.get('/get/:id', getAddressById);
addressRoutes.post('/create', createAddress);
addressRoutes.put('/update', updateAddress);
addressRoutes.delete('/delete', deleteAddress);



module.exports = addressRoutes;




