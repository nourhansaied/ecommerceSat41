
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import brandModel from '../../../../db/models/brand.model.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
const addBrand= catchError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.logo = req.file.filename
    let preBrand = new brandModel(req.body)
    let added = await preBrand.save()
    res.json({message:"Done", added})
})

const getAllBrands = catchError(async(req,res) =>{
    let apiFeature= new APIFeature(brandModel.find(),req.query)
    apiFeature.pagination()
    let allBrands = await apiFeature.mongooseQuery;
    res.json({message:"Done", allBrands})
})

const getBrandById = catchError(async(req,res) =>{
    let brand = await brandModel.findById(req.params.id);
    res.json({message:"Done", brand})
})


const updateBrand= catchError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    if(req.file) req.body.logo= req.file.filename
    let updateBrand = await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateBrand && res.json({message:"Done", updateBrand})
    !updateBrand && res.json({message:"not found brand"})
})

const deleteBrand= deleteOne(brandModel)

export {
   addBrand,
   getAllBrands,
   getBrandById,
   updateBrand,
   deleteBrand
}