


import express from 'express';
import { addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from './controller/category.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCategorySchema,categoryQueryIdSchema,updateCategorySchema } from './category.validation.js';
import { uploadSingleFile } from '../../utils/service/fileUpload.js';
import subCategoryRoutes from '../subCategory/subCategory.routes.js';
import { allowTo, protectedRoutes } from '../auth/controller/auth.controller.js';

const categoryRoutes = express.Router();


categoryRoutes.use("/:category/subCategory", subCategoryRoutes)

categoryRoutes.route("/")
    .post(protectedRoutes,allowTo('admin','user'),uploadSingleFile('image'),validation(addCategorySchema), addCategory)
    .get(getAllCategories)

categoryRoutes.route("/:id")
.get(validation(categoryQueryIdSchema),getCategoryById)
.patch(validation(updateCategorySchema),updateCategory)
.delete(validation(categoryQueryIdSchema),deleteCategory)


export default categoryRoutes;



// reviews
// wishList
// addreess

// coupon



// cart 
// payment