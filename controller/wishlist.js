const Wishlist = require("../models/wishlist")


const createWishList = async (req, res) => {
    try {
        const wishList = await Wishlist.create(req.body);

        res.status(200).json({
            status: true,
            message: "Created Successfully",
            wishList
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getWishList = async (req, res) => {
    try {
        const wishList = await Wishlist.find().populate('user');

        if (wishList.length === 0) {
            res.status(404).josn({
                status: false,
                message: "No wishList available"
            });
        }

        res.status(200).json({
            status: true,
            wishList
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getWishListById = async (req, res) => {
    try {
        const wishList = await Wishlist.findById(req.params.id).populate('user');

        if (!wishList) {
            res.status(404).json({
                status: false,
                message: "WishList not found"
            });
        }

        res.status(200).json({
            status: true,
            wishList
        });

    } catch (error) {
        if (error.name == "CastError") {
            res.status(400).json({
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

const updateWishList = async (req, res) => {
    try {
        const wishList = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!wishList) {
            res.status(404).json({
                status: false,
                message: "Wsihlist not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Updated Successfully",
            wishList
        });
    } catch (error) {
        if (error.name == "CastError") {
            res.status(400).json({
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

const deleteWishList = async (req, res) => {
    try {
        const wishList = await Wishlist.findByIdAndDelete(req.params.id);

        if (!wishList) {
            res.status(404).json({
                status: false,
                message: "WishList not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        if (error.name == "CastError") {
            res.status(400).json({
                status: false,
                message: "Invalid ID"
            });
            res.status(500).json({
                status: false,
                messsage: error.message
            })

        }
    }
}

module.exports = { createWishList, getWishList, getWishListById, updateWishList,deleteWishList }

