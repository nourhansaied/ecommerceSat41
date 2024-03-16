
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
import AppError from '../../../utils/appError.js';
import couponModel from '../../../../db/models/coupon.model.js';


const addCoupon= catchError(async(req,res,next) =>{
   
   let foundedCoupon =  await couponModel.findOne({code:req.body.code});
   if(foundedCoupon) return next(new AppError("already exist", 400))
    req.body.createdBy = req.user._id
    let preCoupon = new couponModel(req.body)
    let addedCoupon = await preCoupon.save()
    res.json({message:"Done", addedCoupon})
})

const getAllCoupons = catchError(async(req,res) =>{

    let apiFeaure = new APIFeature(couponModel.find({}),req.query)
    apiFeaure.pagination()
    let allCoupons = await apiFeaure.mongooseQuery
    res.json({message:"Done", allCoupons})
})

const getCouponById = catchError(async(req,res) =>{
    let coupon = await couponModel.findById(req.params.id);
    res.json({message:"Done", coupon})
})


const updateCoupon= catchError(async(req,res) =>{
    let coupon = await couponModel.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id},req.body,{new:true})
    coupon && res.json({message:"Done", coupon})
    !coupon && res.json({message:"not found coupon"})
})

const deleteCoupon= deleteOne(couponModel)

export {
    addCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}