const Product = require('../models/product');
const Category = require('../models/category');

const createProduct = async (req, res) => {

    try {

        const { name, description, price, category, stock, SKU, isFeatured, isActive } = req.body;

        const categoryExist = await Category.findById(category);

        if (categoryExist) {
            return res.status(400).json({
                status: false,
                message: "Invalis category"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            SKU,
            isFeatured,
            isActive
        });

        res.status(200).json({
            status: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.find().populate('category');

        if(product.length==0){
            res.status(404).json({
                status:false,
                message:"Product not found"
            })
        }

        res.status(200).json({
            status: true,
            product,
        });

    } catch (error) {

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');

        if (!product) {
            res.status(404).json({
                status: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            status: true,
            product,
        });

    } catch (error) {
        if (error.name == "CastError") {
            res.status(500).json({
                status: false,
                message: "Invalid Id"
            });
        }
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!product) {
            res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Updated successfully",
            product,
        });

    } catch (error) {
        if (error.name == "CastError") {
            res.status(500).json({
                status: false,
                message: "Invalid Id"
            });
        }
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Deleted Successfully"
        })

    } catch (error) {
        if (error.name == "CastError") {
            res.status(500).json({
                status: false,
                message: "Invalid Id"
            });
        }
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}



module.exports = { createProduct, getProduct, getProductById, updateProduct,deleteProduct }