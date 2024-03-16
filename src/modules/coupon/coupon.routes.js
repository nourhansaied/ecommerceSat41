


import express from 'express';
import { validation } from '../../middleware/validation.js';
import {addCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon} from './controller/coupon.controller.js'
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
import { addCouponVal, couponQueryIdVal, updateCouponVal } from './coupon.validation.js';
const couponRoutes = express.Router();

couponRoutes.route("/")
    .post(protectedRoutes,allowTo('admin'),validation(addCouponVal), addCoupon)
    .get(getAllCoupons)

couponRoutes.route("/:id")
.get(validation(couponQueryIdVal),getCouponById)
.patch(protectedRoutes,validation(updateCouponVal),updateCoupon)
.delete(validation(couponQueryIdVal),deleteCoupon)


export default couponRoutes;

// 1- cart model
// 2- create cart
// 3- total price
// 4- update quntity product .... ()
//  remove item from cart
// 5- get user cart
// 6- clear cart


// apply coupon




// order ... cach .... online