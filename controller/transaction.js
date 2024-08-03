const Transaction = require('../models/transaction');
const nodemailer = require('nodemailer')

const createTransaction = async (req, res) => {
    try {
        const { order, paymentMethod, amount, transactionId, status } = req.body;

        const transaction = new Transaction({
            order,
            paymentMethod,
            amount,
            transactionId,
            status
        });

        await transaction.save();

        res.status(201).json({
            status: true,
            message: "Transaction created successfully",
            transaction
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('order');


        if (!transaction) {
            return res.status(404).json({
                status: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            status: true,
            transaction
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getTransactionByOrderId = async (req, res) => {
    try {
        const transaction = await Transaction.find({ order: req.params.orderId });

        if (transaction.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            status: true,
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

//list all transaction with pagination and sorting
const listAllTransaction = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'createdAt' } = req.body;
        const transaction = await Transaction.find()
            .populate('order')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Transaction.countDocuments();

        res.status(200).json({
            status: true,
            transaction,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const searchTransactions = async (req, res) => {
    try {
        const { transactionId, status, startDate, endDate } = req.query;
        const filter = {};

        if (transactionId) filter.transactionId = transactionId;
        if (status) filter.status = status;
        if (startDate && endDate) {
            filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const transactions = await Transaction.find(filter).populate('order');

        res.status(200).json({
            status: true,
            transactions
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


const exportTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.find().populate('order').exec();

        const csv = parse(transaction.map(tr => ({
            order: tr.order,
            paymentMethod: tr.paymentMethod,
            amount: tr.amount,
            transactionId: tr.transactionId,
            status: tr.status,
            createdAt: tr.createdAt,
            updatedAt: tr.updatedAt
        })));

        const filePath = path.join(__dirname, 'transaction.csv');
        fs.writeFileSync(filePath, csv);

        res.status(200).download(filePath, 'transaction.csv');
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const sendNotification = async (transaction) => {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            password: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'shaikhmehtab70222@gmail.com',
        to: 'shaikhmehtab2501@gmail.com',
        subject: 'Transaction Status Update',
        text: `Your transaction ${transaction.transactionId} has been ${transaction.status}.`
    };

    try {
        await transpoter.sendMail(mailOptions);
        console.log('notification sent successfully');
    } catch (err) {
        console.error('Failed to send notification:', error);
    }

}

const updateTransaction = async (req, res) => {
    try {
        const { status } = req.body;
        const transaction = await Transaction.findById(req.params.id);

        if (transaction) {
            return res.status(404).json({
                status: false,
                message: "Transaction not found"
            });
        }

        transaction.status = status;
        await transaction.save();

        await sendNotification(transaction);

        res.status(200).json({
            status: true,
            message: "Transaction updated successfully",
            transaction
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = { createTransaction, getTransactionById, getTransactionByOrderId, exportTransaction, searchTransactions, listAllTransaction, updateTransaction }