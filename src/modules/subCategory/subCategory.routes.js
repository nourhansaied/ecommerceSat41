


import express from 'express';
import { addSubCategory, getSubCategoryById, getAllSubCategories, updateSubCategory, deleteSubCategory } from './controller/subCategory.controller.js';
import { validation } from '../../middleware/validation.js';
import { uploadSingleFile } from '../../utils/service/fileUpload.js';
import {addSubCategorySchema, subCategoryQueryIdSchema,updateSubCategorySchema} from './subCategory.validation.js'
const subCategoryRoutes = express.Router({mergeParams:true});


subCategoryRoutes.route("/")
    .post(uploadSingleFile('image'),validation(addSubCategorySchema), addSubCategory)
    .get(getAllSubCategories)

subCategoryRoutes.route("/:id")
.get(validation(subCategoryQueryIdSchema),getSubCategoryById)
.patch(validation(updateSubCategorySchema),updateSubCategory)
.delete(validation(subCategoryQueryIdSchema),deleteSubCategory)


export default subCategoryRoutes;