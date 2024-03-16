
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
import reviewModel from '../../../../db/models/reviews.model.js';
import AppError from '../../../utils/appError.js';


const addReview= catchError(async(req,res,next) =>{
   
   let foundedReview =  await reviewModel.findOne({product:req.body.product,createdBy: req.user._id});
   if(foundedReview) return next(new AppError("already reviewed", 400))
    req.body.createdBy = req.user._id
    let preReview = new reviewModel(req.body)
    let addedReview = await preReview.save()
    res.json({message:"Done", addedReview})
})

const getAllReviews = catchError(async(req,res) =>{

    let apiFeaure = new APIFeature(reviewModel.find({}),req.query)
    apiFeaure.pagination()
    let allRviews = await apiFeaure.mongooseQuery
    res.json({message:"Done", allRviews})
})

const getReviewById = catchError(async(req,res) =>{
    let review = await reviewModel.findById(req.params.id);
    res.json({message:"Done", review})
})


const updateReview= catchError(async(req,res) =>{
    let review = await reviewModel.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id},req.body,{new:true})
    review && res.json({message:"Done", review})
    !review && res.json({message:"not found review"})
})

const deleteReview= deleteOne(reviewModel)

export {
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
}