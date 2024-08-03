const express = require('express');

const { createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controller/category');

const categoryRoutes = express.Router();

categoryRoutes.post('/create', createCategory);
categoryRoutes.get('/get', getCategory);
categoryRoutes.get('/get/:id', getCategoryById);
categoryRoutes.put('/update/:id', updateCategory);
categoryRoutes.delete('/delete/:id', deleteCategory);


module.exports = categoryRoutes;