


import express from 'express';
import { validation } from '../../middleware/validation.js';
import { uploadSingleFile } from '../../utils/service/fileUpload.js';
import {addBrandSchema,updateBrandSchema,brandIdSchema} from './brand.validation.js'
import { addBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from './controller/brand.controller.js';
const brandRoutes = express.Router();


brandRoutes.route("/")
    .post(uploadSingleFile('image'),validation(addBrandSchema), addBrand)
    .get(getAllBrands)

brandRoutes.route("/:id")
.get(validation(brandIdSchema),getBrandById)
.patch(validation(updateBrandSchema),updateBrand)
.delete(validation(brandIdSchema),deleteBrand)


export default brandRoutes;