


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { addReviewVal, reviewQueryIdVal, updateReviewVal } from './reviews.validation.js';
import { addReview, deleteReview, getAllReviews, getReviewById, updateReview } from './controller/reviews.controller.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';
const reviewRoutes = express.Router();


reviewRoutes.route("/")
    .post(protectedRoutes,validation(addReviewVal), addReview)
    .get(getAllReviews)

reviewRoutes.route("/:id")
.get(validation(reviewQueryIdVal),getReviewById)
.patch(protectedRoutes,validation(updateReviewVal),updateReview)
.delete(allowTo('admin','user'),validation(reviewQueryIdVal),deleteReview)


export default reviewRoutes;