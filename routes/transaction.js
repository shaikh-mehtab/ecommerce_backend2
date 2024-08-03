const express = require('express');
const { createTransaction,
    getTransactionById,
    getTransactionByOrderId,
    updateTransaction,
    listAllTransaction,
    searchTransactions,
    exportTransaction
} = require('../controller/transaction');
const transactionRouter = express.Router();

router.post('/transaction', createTransaction);
router.get('/transaction/:id', getTransactionById);
router.get('/order/:orderId/transactions', getTransactionByOrderId);
router.put('/transaction/:id', updateTransaction);
router.get('/transactions', listAllTransaction);
router.get('/transactions/search', searchTransactions);
router.get('/transactions/export', exportTransaction);


module.expotrs = transactionRouter;