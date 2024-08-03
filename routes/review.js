const express = require('express');
const { createReview,
    getReviewByProduct,
    updateReview,
    deleteReview,
    listAllReview,
    getAverageRating,
    reportReview
} = require('../controller/review');
const reviewRoute = express.Router();

reviewRoute.post('/review', createReview);
reviewRoute.get('/product/:productId/reviews', getReviewByProduct);
reviewRoute.put('/review/:id', updateReview);
reviewRoute.delete('/review/:id', deleteReview);
reviewRoute.get('/reviews', listAllReview);
reviewRoute.get('/product/:productId/average-rating', getAverageRating);
reviewRoute.post('/review/:id/report', reportReview);



module.exports = reviewRoute;