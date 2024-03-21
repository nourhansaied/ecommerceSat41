


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
import { createCashOrder, createOnloneOrder, createSessionURL, getAllOrders, getSpaificOrder } from './controller/order.controller.js';
import { createOrderVal } from './order.validation.js';
const orderRoutes = express.Router();


orderRoutes.route("/:id")
.post(protectedRoutes, validation(createOrderVal), createCashOrder)
orderRoutes.route("/")
//     .post(protectedRoutes,validation(addTocartVal), addToCart)
    .get(protectedRoutes,getSpaificOrder)
//     .patch(protectedRoutes,validation(updateQuVal), updateCartQuantity)
// orderRoutes.post("/apply", protectedRoutes,applyCoupon)
//     orderRoutes.route("/:id")
//         .patch(protectedRoutes,validation(QueryIdVal), removeItem)
orderRoutes.get("/all", protectedRoutes,allowTo('admin'), getAllOrders)
orderRoutes.post("/online/:id",protectedRoutes, createSessionURL)

app.post('/webhook', express.raw({type: 'application/json'}),createOnloneOrder)
export default orderRoutes;


// routenodec41


// q5lpmE0cdrTP2aB1



// nour-ecommerce.com .... => db ... user ... userName ..password