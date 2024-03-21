
import cartModel from '../../../../db/models/cart.model.js';
import couponModel from '../../../../db/models/coupon.model.js';
import orderModel from '../../../../db/models/order.model.js';
import productModel from '../../../../db/models/product.model.js';
import catchError from '../../../middleware/catchError.js';
import AppError from '../../../utils/appError.js';
import Stripe from 'stripe';
import express from 'express'
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



const createSessionURL = catchError(async(req,res,next) => {
    let cart = await cartModel.findById(req.params.id);
    if(!cart) return next (new AppError("cart not found", 404))

    // 2- total price
    let orderTotalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount: cart.totalPrice;

    let session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: "http://localhost:4200/en",
        cancel_url: "http://localhost:4200/en/404",
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
        client_reference_id: req.params.id,
        customer_email : req.user.email,
        metadata : req.body.shippingAddress
    });


    res.json({message :"Done", session})
});
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.

app.post('/webhook', express.raw({type: 'application/json'}), async(req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, "whsec_JfZ1l5T9Wu1O9OZ1HXYBGkfZgAIxs9Yo");
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
    
  }


  if(event.type == "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    // create order
    console.log("done");
  }else {
    console.log(`Unhandled event type ${event.type}`);

  }


  // Return a 200 res to acknowledge receipt of the event
  res.json({message:"Done"});
});

app.listen(4242, () => console.log('Running on port 4242'));

export {
   createCashOrder,
   getSpaificOrder,
   getAllOrders,
   createSessionURL


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