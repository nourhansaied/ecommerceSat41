
import userModel from '../../../../db/models/user.model.js';
import catchError from '../../../middleware/catchError.js';




const addWhishList= catchError(async(req,res) =>{
    let wishList = await userModel.findByIdAndUpdate(req.user._id,{$addToSet: {wishList:req.body.product}},{new:true})
    wishList && res.json({message:"Done", wishList})
    !wishList && res.json({message:"not found wishList"})
})

const removeWhishList= catchError(async(req,res) =>{
    let wishList = await userModel.findByIdAndUpdate(req.user._id,{$pull: {wishList:req.params.id}},{new:true})
    wishList && res.json({message:"Done", wishList})
    !wishList && res.json({message:"not found wishList"})
})
export {
    
    addWhishList,
    removeWhishList

}



// addToSet
// pull
// push
// pop