const express = require('express');
const product = require('../controller/product');
const  productRoutes = express.Router();

productRoutes.post('/create',product.createProduct);
productRoutes.get('/get',product.getProduct);
productRoutes.get('/get/:id',product.getProductById);
productRoutes.put('/update/:id',product.deleteProduct);
productRoutes.delete('/delete/:id',product.deleteProduct);

module.exports = productRoutes;