
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import SubCategoryModel from '../../../../db/models/subCategory.model.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
const addSubCategory= catchError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    req.body.image = req.file.filename
    let preSubCategory = new SubCategoryModel(req.body)
    let addedSubCategory = await preSubCategory.save()
    res.json({message:"Done", addedSubCategory})
})

const getAllSubCategories = catchError(async(req,res) =>{
    console.log(req.params);
    let filterObje= {}
    if(req.params.category) {
        filterObje.category = req.params.category
    }
    let apiFeaure = new APIFeature(SubCategoryModel.find(filterObje),req.query)
    apiFeaure.pagination()
    let allSubCategories = await apiFeaure.mongooseQuery
    // let allSubCategories  = await SubCategoryModel.find(filterObje)
    res.json({message:"Done", allSubCategories})
})

const getSubCategoryById = catchError(async(req,res) =>{
    let subCategory = await SubCategoryModel.findById(req.params.id);
    res.json({message:"Done", subCategory})
})


const updateSubCategory= catchError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    let updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedSubCategory && res.json({message:"Done", updatedSubCategory})
    !updatedSubCategory && res.json({message:"not found subCategory"})
})

const deleteSubCategory= deleteOne(SubCategoryModel)

export {
    addSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
}