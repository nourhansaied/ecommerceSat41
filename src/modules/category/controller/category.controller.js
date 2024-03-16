
import categoryModel from '../../../../db/models/category.model.js';
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
const addCategory= catchError(async(req,res) =>{

    // console.log(req.file);
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let preCategory = new categoryModel(req.body)
    let addedCategory = await preCategory.save()
    res.json({message:"Done", addedCategory})
})

const getAllCategories = catchError(async(req,res) =>{
    let apiFeature = new APIFeature(categoryModel.find(),req.query)
    apiFeature.pagination()
    let allCategories = await apiFeature.mongooseQuery
    res.json({message:"Done", allCategories})
})

const getCategoryById = catchError(async(req,res) =>{
    let category = await categoryModel.findById(req.params.id);
    res.json({message:"Done", category})
})


const updateCategory= catchError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedCategory && res.json({message:"Done", updatedCategory})
    !updatedCategory && res.json({message:"not found category"})
})

const deleteCategory= deleteOne(categoryModel)

export {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}