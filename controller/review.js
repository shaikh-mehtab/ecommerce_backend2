const Review = require('../models/review');

const createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;

        if (!rating || !comment) {
            return res.status(400).json({
                status: false,
                message: "Rating and comment are required"
            });
        }

        const review = new Review({
            product: productId,
            user: userId,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({
            status: true,
            message: "Review Created Successfullly",
            review
        });


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const getReviewByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const review = await Review.find({ product: productId }).populate('user', 'name');

        res.status(200).json({
            status: true,
            review
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { rating, reviewText } = req.body;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                status: false,
                message: "Review not found"
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: false,
                message: "Not authorized to update this review"
            });
        }
        review.rating = rating;
        review.reviewText = reviewText;
        await review.save();

        res.status(200).json({
            status: true,
            message: "Review Updated Successfully",
            review
        })


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                status: false,
                message: "Review not found"
            })
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                status: false,
                message: "Not authorized to delete this review"
            });
        }

        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({
            status: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const listAllReview = async (req, res) => {
    try {
        const reviews = await Review.find().populate('product').populate('user', 'name');

        res.status(200).json({
            status: true,
            reviews
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getAverageRating = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ product: productId });

        if (reviews.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No reviews found for this product"
            });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / review.length;

        res.status(200).json({
            status: true,
            averageRating
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const reportReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({
                status: false,
                message: 'Review Not Found'
            });
        }

        res.status(200).json({
            status: true,
            message: "Review reported successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    createReview,
    getReviewByProduct,
    updateReview,
    deleteReview,
    listAllReview,
    getAverageRating,
    reportReview

}





