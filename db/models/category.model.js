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
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps : true
});


schema.post("init", function(doc) {
    doc.image = process.env.BASE_URL + "uploads/" + doc.image
})

const categoryModel = mongoose.model("Category", schema);

export default categoryModel;

