import catchError from "../../middleware/catchError.js"



export const deleteOne = (model) =>{
    return catchError(async(req,res) =>{
        let element = await model.findByIdAndDelete(req.params.id)
        element && res.json({message:"Done", element})
        !element && res.json({message:"not found element"})
    })
}