


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { addAddressVal } from './address.validation.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';
import { addAddress } from './controller/address.controller.js';
const addressRoutes = express.Router();


// addressRoutes.route("/")
//     .post(protectedRoutes,validation(addReviewVal), addReview)
//     .get(getAllReviews)

addressRoutes.route("/").patch(protectedRoutes,validation(addAddressVal), addAddress)
// addressRoutes.route("/:id").patch(protectedRoutes,validation(QueryIdVal), removeAddress)

// addressRoutes.route("/:id")
// .get(validation(reviewQueryIdVal),getReviewById)
// .patch(protectedRoutes,validation(updateReviewVal),updateReview)
// .delete(allowTo('admin','user'),validation(reviewQueryIdVal),deleteReview)


export default addressRoutes;