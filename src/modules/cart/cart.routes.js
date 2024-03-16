


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';
import { QueryIdVal, addTocartVal, updateQuVal } from './cart.validation.js';
import { addToCart, applyCoupon, getLoggedInCart, removeItem, updateCartQuantity } from './controller/cart.controller.js';
const cartRoutes = express.Router();


cartRoutes.route("/")
    .post(protectedRoutes,validation(addTocartVal), addToCart)
    .get(protectedRoutes,getLoggedInCart)
    .patch(protectedRoutes,validation(updateQuVal), updateCartQuantity)
cartRoutes.post("/apply", protectedRoutes,applyCoupon)
    cartRoutes.route("/:id")
        .patch(protectedRoutes,validation(QueryIdVal), removeItem)

export default cartRoutes;