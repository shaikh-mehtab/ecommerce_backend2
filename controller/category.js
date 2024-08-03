const Category = require('../models/category');

const createCategory = async (req, res) => {
    try {
    
        const creatdeCategory = await Category.create(req.body);

        res.status(200).json({
            status: true,
            message: "Catgeory created",
            creatdeCategory,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find();

        if(category.length==0){
            res.status(404).json({
                status:false,
                message:"Category not found"
            })
        }

        res.status(200).json({
            status: true,
            category,
        });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.param.id);

        if (!category) {
            res.status(404).json({
                status: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            status: true,
            category,
        })
    } catch (error) {

        if (error.name == "CastError") {
            res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.param.id, req.body, { new: true, runValidators: true });

        if (!category) {
            res.status(404).json({
                status: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Updated Succssfully",
            category,
        });

    } catch (error) {

        if (error.name == "CastError") {
            res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.param.id);

        if (!category) {
            res.status(404).json({
                status: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            staus: true,
            message: "Deleted successfully"
        })
    } catch (error) {

        if (error.name == "CastError") {
            res.status(500).send({
                success: false,
                message: "Invalid Id"
            });
        }

        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = { createCategory, getCategory, getCategoryById,updateCategory,deleteCategory }