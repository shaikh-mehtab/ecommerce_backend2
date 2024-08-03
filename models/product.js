const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        unique: true, 
        maxLength: [100, 'Product name cannot be more than 100 characters'] 
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Product description is required'],
        maxLength: [1000, 'Product description cannot be more than 1000 characters'] 
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number'] 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: [true, 'Product category is required']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        min: [0, 'Stock must be a positive number']
    },
    images: [
        {
            url: {
                type: String,
                required: [true, 'Image URL is required']
            },
            altText: {
                type: String,
                trim: true,
                maxLength: [100, 'Alt text cannot be more than 100 characters'] 
            }
        }
    ],
    SKU: {
        type: String,
        trim: true,
        unique: true, 
        maxLength: [50, 'SKU cannot be more than 50 characters']
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating must be at most 5'] 
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true 
});


module.exports = mongoose.model('Product', productSchema);
