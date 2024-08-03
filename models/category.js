const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        trim: true,
        required: [true, 'category name is required'],
        unique: true,
        maxLength: [50, 'Category name cannot be more than 50 characters']
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Category",categorySchema); 
