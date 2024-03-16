import mongoose from 'mongoose';

import bcrypt from 'bcrypt'
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: String,
    role: {
        type:String,
        enums: ["admin","user"],
        default: "User",
        lowercase:true
    },
    password:{
        type:String,
        required: true
    },
    isActive: {
        type:Boolean,
        default: true
    },
    isBlocked: {
        type:Boolean,
        default: false
    },
    isVerfied: {
        type:Boolean,
        default: false
    },
    changePasswordAt: Date,
    wishList: [
        {
            type:mongoose.Types.ObjectId,
            ref: 'Product'
        }
    ],
    addresses: [{
        street: String,
        phone: String,
        city:String
    }]
    

}, {
    timestamps : true
});
// req.body.password = bcrypt.hashSync(req.body.password,parseInt(process.env.SALTROUND))

schema.pre("save" ,function() {
    this.password = bcrypt.hashSync(this.password,parseInt(process.env.SALTROUND))
})


schema.pre("findOneAndUpdate" ,function() {
    console.log(this,"hello from the other side POST");
    if(this._update.password)
        this._update.password = bcrypt.hashSync(this._update.password,parseInt(process.env.SALTROUND))

})
const userModel = mongoose.model("User", schema);

export default userModel;





