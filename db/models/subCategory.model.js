import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength:[3," title is too short"],
        trim: true,
        unique: true
    },
    slug: {
        type:String,
        required: true,
        lowercase: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps : true
});


const SubCategoryModel = mongoose.model("SubCategory", schema);

export default SubCategoryModel;





