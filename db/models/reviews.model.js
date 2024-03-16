import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    rating: Number,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }

}, {
    timestamps : true
});

schema.pre(/^find/, function() {
    this.populate("createdBy","name")
})

const reviewModel = mongoose.model("Review", schema);

export default reviewModel;





