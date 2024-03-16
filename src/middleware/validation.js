import AppError from "../utils/appError.js";



export const validation = (schema) =>{
    return (req,res,next)=> {
        // let image = null;
        // if(req.file) image= req.file;
        /*


        {
            images: ["Asda","Asda"],
            imageCover: "Asdasd"
        }

        */

        let filters = {};
        if(req.file) {
            filters = {image: req.file ,...req.body,...req.params,...req.query}
        }else if( req.files ) {
            filters = { ...req.files ,...req.body,...req.params,...req.query}
        }else {
            filters = {...req.body,...req.params,...req.query}
        }
        const {error} = schema.validate(filters,{abortEarly:false});
        if(!error) {
            next()
        }else {
            let errorList = [];
            error.details.forEach(val =>{
                errorList.push(val.message)
            });
            next(new AppError(errorList, 401))
        }
    }
}



// brand
// product
// merge params
// refactor
// API feature (filter , pagination, sorting ,search)