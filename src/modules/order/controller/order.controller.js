
import cartModel from '../../../../db/models/cart.model.js';
import couponModel from '../../../../db/models/coupon.model.js';
import orderModel from '../../../../db/models/order.model.js';
import productModel from '../../../../db/models/product.model.js';
import catchError from '../../../middleware/catchError.js';
import AppError from '../../../utils/appError.js';

const createCashOrder = catchError(async(req,res,next) => {

    // 1- get cart
    let cart = await cartModel.findById(req.params.id);
    if(!cart) return next (new AppError("cart not found", 404))

    // 2- total price
    let orderTotalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount: cart.totalPrice;
    // 3- create oder
    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalPrice: orderTotalPrice,
        shippingAddress : req.body.shippingAddress
    });
    await order.save()

    // 10 products .... loop 10 times on productModel ... findByIdAndUpdate
    // 4- increamnt l sold w decreament quanity 


    let options = cart.cartItems.map(ele =>{
        return (
            {
                updateOne:{
                    filter: {_id: ele.product},
                    update: { $inc: {sold: ele.quantity,quantity: -ele.quantity}}
                }
            }
        )
    })
    
    await productModel.bulkWrite(options)

    // 5- clear cart
    await cartModel.findByIdAndDelete(req.params.id)

    res.json({message:"Done", order})


});


const getSpaificOrder = catchError(async(req,res,next) => {
    let order = await orderModel.findOne({user:req.user._id}).populate('orderItems.product')
    res.json({message :"Done", order})
})

const getAllOrders = catchError(async(req,res,next) => {
    let order = await orderModel.findOne({}).populate('orderItems.product')
    res.json({message :"Done", order})
})


export {
   createCashOrder,
   getSpaificOrder,
   getAllOrders,


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



/*


[
    updateOne: {
        filter : "asdjaksdjaksjd",
        update:{sold}
    },
    updateOne: {
        filter: "Asdasd",
        sold
    }
]




*/