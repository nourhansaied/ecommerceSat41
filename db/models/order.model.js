import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    orderItems : [
        {
            product : {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity:Number,
            price: Number
        }
    ],
    totalPrice : Number,
    shippingAddress: {
        street:String,
        city:String,
        phone:String,
    },
    paymentType: {
        type:String,
        enum:['cash','card'],
        default: 'cash'
    },
    isDelivered: {
        type:Boolean,
        default: false
    },
    deliverdAt:Date,
    isPaid: {
        type:Boolean,
        default:false
    },
    paidAt:Date

}, {
    timestamps : true
});


const orderModel = mongoose.model("Order", schema);

export default orderModel;





