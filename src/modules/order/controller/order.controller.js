
import cartModel from '../../../../db/models/cart.model.js';
import couponModel from '../../../../db/models/coupon.model.js';
import orderModel from '../../../../db/models/order.model.js';
import productModel from '../../../../db/models/product.model.js';
import catchError from '../../../middleware/catchError.js';
import AppError from '../../../utils/appError.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JjJRNFBzUQr5ynVSBFGtyCLfuBBEoAc3tAP4jXywtFS2QjjaEPiQ2iqsKJPabYQd5TjGTIPhO9ZZCaGcjObfUqV00SIUjx6gv');

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

const createCheckoutSession = catchError(async(req,res,next) => {
    const cart = await cartModel.findById(req.params.id);
    let orderTotalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount: cart.totalPrice;

   let session =  await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency :"EGP",
                    unit_amount : orderTotalPrice * 100,
                    product_data: {
                        name: req.user.name
                    },
                },
                quantity: 1
            }
        ],
        mode:'payment',
        success_url:"http://localhost:4200/en",
        cancel_url:"http://localhost:4200/en/404",
        client_reference_id: req.params.id,
        customer_email : req.user.email,
        metadata : req.body.shippingAddress
    });
    res.json({message:"asd", session})
})


const creatOnline = catchError(async (request, response) => {
    console.log(request);
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, "whsec_oF9BdQJNDPjLTN4G15iUl4YM9LH1Xp3o");
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
      
    }
  
    // Handle the event
    if(event.type == "checkout.session.completed") {
      const checkoutSessionCompleted = event.data.object;
      console.log(checkoutSessionCompleted);
    }else {
      console.log(`Unhandled event type ${event.type}`);
  
    }
  })
export {
   createCashOrder,
   getSpaificOrder,
   getAllOrders,
   createCheckoutSession,
   creatOnline

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