const Coupon = require('../models/coupon');

const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.find();

        if (coupon.length == 0) {
            res.status(404).json({
                status: false,
                message: "No coupons found"
            });
        }

        res.status(200).json({
            status: true,
            coupon,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            res.status(404).json({
                status: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            status: true,
            coupon,
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

const createCoupon = async (req, res) => {
    try {

        const coupon = await Coupon.create(req.body);

        res.status(200).json({
            status: true,
            message: "Created Successfully",
            coupon,
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: truncateSync });

        if (!coupon) {
            res.status(404).json({
                status: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Updated Successfully"
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

const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);

        if (!coupon) {
            res.status(404).json({
                status: false,
                message: "Coupon not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Deleted Successfully"
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

const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(404).json({
                status: false,
                message: "Coupon not found"
            });
        }

        const now = new Date();

        if (!coupon.isActive || now < coupon.validFrom || coupon.usageLimit <= coupon.usedCount) {
            return res.status(400).json({
                status: false,
                message: "Coupon not valid"
            });
        }


        res.status(200).json({
            status: true,
            messsage: "Coupon is valid",
            discount: coupon.discount
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const getActiveCoupon = async (req, res) => {
    try {
        const now = new Date();

        const coupons = await Coupon.find({ isActive: true, validFrom: { $lte: now }, validTo: { $gte: now } });

        if (coupons.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No active coupons found"
            });
        }

        res.status(200).json({
            status: true,
            coupons
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const applyCoupon = async (req, res) => {
    try {
        const { code } = req.boy;

        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(404).json({
                status: false,
                message: "Coupon not found"
            });
        }

        const now = new Date();

        if (!coupon.isActive || now < coupon.validFrom || coupon.usageLimit <= coupon.usedCount) {
            return res.status(400).json({
                status: false,
                message: "Coupon not valid"
            });
        }

        coupon.usedCount += 1;
        await coupon.save();

        res.status(200).json({
            status: true,
            message: "Coupon applied successfully",
            discount: coupon.discount
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

const deactivateExpriedCoupons = async () => {
    try {
        const now = new Date();

        await Coupon.updateMany({ validTo: { $lt: now }, isActive: true }, { isActive: false });
        console.log("Expired counpon deactivated");
    } catch (error) {
        console.error("Error deactivating expired coupons:", error.message);
    }
}





module.exports = { getCoupon, getCouponById, createCoupon, updateCoupon, deleteCoupon, validateCoupon, getActiveCoupon, applyCoupon , deactivateExpriedCoupons }