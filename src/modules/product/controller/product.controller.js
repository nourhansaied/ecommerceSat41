
import slugify from 'slugify';
import catchError from '../../../middleware/catchError.js';
import productModel from '../../../../db/models/product.model.js';
import { deleteOne } from '../../handlers/apiHandler.js';
import { APIFeature } from '../../../utils/ApiFeature.js';
const addProduct= catchError(async(req,res) =>{
    console.log(req.files);
    req.body.slug = slugify(req.body.title);
    // req.body.imageCover = req.files.imageCover[0].filename;
    // req.body.images = req.files.images.map(ele => ele.filename)
    let preProduct = new productModel(req.body)
    let added = await preProduct.save()
    res.json({message:"Done", added})
})

const getAllProducts = catchError(async(req,res) =>{

    let mongooseQuery = new APIFeature(productModel.find(),req.query)
    mongooseQuery.pagination().sort()

    let allProducts = await mongooseQuery.mongooseQuery.find()
    res.json({message:"Done" ,pageNumber:mongooseQuery.pageNumber, allProducts})
})

const getProductById = catchError(async(req,res) =>{
    let product = await productModel.findById(req.params.id).populate('myReviews')
    res.json({message:"Done", product})
})


const updateProduct= catchError(async(req,res) =>{
    req.body.slug = slugify(req.body.title);
    if(req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
    if(req.files.images) req.body.images = req.files.images.map(ele=>ele.filename)

    let updateProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updateProduct && res.json({message:"Done", updateProduct})
    !updateProduct && res.json({message:"not found product"})
})


// https://ecommerce.routemisr.com/api/v1/products?price[gte]=200
const deleteProduct= deleteOne(productModel)

export {
   addProduct,
   getAllProducts,
   getProductById,
   updateProduct,
   deleteProduct
}



