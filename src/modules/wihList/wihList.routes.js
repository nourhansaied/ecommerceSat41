


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { QueryIdVal, addWishListVal } from './wihList.validation.js';
import { addWhishList, removeWhishList } from './controller/wihList.controller.js';
import { protectedRoutes } from '../auth/controller/auth.controller.js';
const wishListRoutes = express.Router();


// wishListRoutes.route("/")
//     .post(protectedRoutes,validation(addReviewVal), addReview)
//     .get(getAllReviews)

wishListRoutes.route("/").patch(protectedRoutes,validation(addWishListVal), addWhishList)
wishListRoutes.route("/:id").patch(protectedRoutes,validation(QueryIdVal), removeWhishList)

// wishListRoutes.route("/:id")
// .get(validation(reviewQueryIdVal),getReviewById)
// .patch(protectedRoutes,validation(updateReviewVal),updateReview)
// .delete(allowTo('admin','user'),validation(reviewQueryIdVal),deleteReview)


export default wishListRoutes;