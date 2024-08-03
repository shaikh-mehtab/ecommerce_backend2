const express = require('express');
const { getCoupon,
    getCouponById,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    validateCoupon,
    getActiveCoupon,
    applyCoupon,
    deactivateExpriedCoupons
} = require('../controller/coupon');
const couponRoutes = express.Router();

couponRoutes.get('/get', getCoupon);
couponRoutes.get('/get/:id', getCouponById);
couponRoutes.get('/get-active-coupon', getActiveCoupon);
couponRoutes.post('/create', createCoupon);
couponRoutes.post('/apply-couupon', applyCoupon)
couponRoutes.post('/validate-coupon', validateCoupon);
couponRoutes.put('/deactive-expried-coupon', deactivateExpriedCoupons);
couponRoutes.put('/update', updateCoupon);
couponRoutes.delete('/delete', deleteCoupon);



module.exports = couponRoutes;