
import userModel from '../../../../db/models/user.model.js';
import catchError from '../../../middleware/catchError.js';




const addAddress= catchError(async(req,res) =>{
    let address = await userModel.findByIdAndUpdate(req.user._id,{$addToSet: {addresses:req.body}},{new:true})
    address && res.json({message:"Done", address})
    !address && res.json({message:"not found address"})
})

const removeAddress= catchError(async(req,res) =>{
    let address = await userModel.findByIdAndUpdate(req.user._id,{$pull: {addresses:req.body}},{new:true})
    address && res.json({message:"Done", address})
    !address && res.json({message:"not found address"})
})
export {
    
    addAddress,
    removeAddress

}



// addToSet
// pull
// push
// pop