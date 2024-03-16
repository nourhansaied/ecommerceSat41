
import cartModel from '../../../../db/models/cart.model.js';
import couponModel from '../../../../db/models/coupon.model.js';
import productModel from '../../../../db/models/product.model.js';
import catchError from '../../../middleware/catchError.js';
import AppError from '../../../utils/appError.js';


const calcTotalPrice = (isExistCart) =>{
    let totalPrice = 0;
    isExistCart.cartItems.forEach(ele =>{
        totalPrice += ele.price * ele.quantity
    })
    isExistCart.totalPrice = totalPrice;

    if(isExistCart.discount) {
        let totalPriceAfterDiscount = isExistCart.totalPrice - (isExistCart.totalPrice * isExistCart.discount) /100;
        isExistCart.totalPriceAfterDiscount = totalPriceAfterDiscount
    
    }
}


const addToCart= catchError(async(req,res,next) =>{
    // product id ...... product if exist or not ?
    let product = await productModel.findById(req.body.product);
    !product && next(new AppError("product not found",404))
    if(req.body.quantity > product.quantity) next(new AppError("sold out", 401))
    let isExistCart = await cartModel.findOne({user: req.user._id});
    req.body.price = product.price
    if(!isExistCart) {
       let item = {
        user: req.user._id,
        cartItems : [req.body]
       }
        let cart = new cartModel(item)
        calcTotalPrice(cart)
        await cart.save();
        res.json({message:"Done", cart})
    }else {
        let item = isExistCart.cartItems.find(ele => ele.product == req.body.product);
        if(item ) {
            let bl7 = item.quantity + req.body.quantity;
            if(bl7 > product.quantity) {
                return next(new AppError("sold out", 401))
            }
            item.quantity += req.body.quantity || 1 
        }else {
            isExistCart.cartItems.push(req.body)
        }
        calcTotalPrice(isExistCart)
        await isExistCart.save()
        res.json({message:"Else",cart : isExistCart})
    }
})


const removeItem = catchError(async(req,res,next) => {
    let updatedCart = await cartModel.findOneAndUpdate({user: req.user._id},{$pull: {cartItems:{_id:req.params.id}}},{new:true})
    
    !updatedCart && next(new AppError("cart not found", 404))
    if(updatedCart.cartItems.length == 0) {
        await cartModel.findOneAndDelete({user: req.user._id})
    }
    
    res.json({message: "updated", updatedCart})
})

const getLoggedInCart = catchError(async(req,res,next) =>{
    let cart = await cartModel.findOne({user: req.user._id}).populate('cartItems.product')
    !cart && next(new AppError("no cart found", 404))
    res.json({message :"Done", cart})
})

const updateCartQuantity = catchError(async(req,res,next) =>{
    let product = await productModel.findById(req.body.product);
    !product && next(new AppError("product not found", 404));
    let cart = await cartModel.findOne({user: req.user._id});
    !cart && next(new AppError("cart not found", 404));

   let item =  cart.cartItems.find(ele => ele.product == req.body.product);
   !item && next(new AppError("please add product to cart", 404));
   if(req.body.quantity > product.quantity) {
       return next(new AppError("sold out", 401))
   }
   item.quantity  = req.body.quantity
   calcTotalPrice(cart)
   await cart.save();
   res.json({message : "Done", cart})
})



const applyCoupon = catchError(async(req,res,next) =>{
    let isExistcoupon = await couponModel.findOne({code: req.body.code, expires: {$gte: Date.now()}})
    !isExistcoupon && next(new AppError("coupon not valid", 401));
    let cart = await cartModel.findOne({user:req.user._id});
    !cart && next(new AppError("cart not exist", 404));
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * isExistcoupon.discount) /100;
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    cart.discount   = isExistcoupon.discount

    await cart.save()
    res.json({message : "Done", cart})
})


export {
    
    addToCart,
    removeItem,
    getLoggedInCart,
    updateCartQuantity,
    applyCoupon

}



// addToSet
// pull
// push
// pop



// order ...model ....CRUD... create Cash order

// getAllOrders 
// getSpasifc order
// DB online
// Code online
// Deploy server .... onRender 
// intro Online payment ...