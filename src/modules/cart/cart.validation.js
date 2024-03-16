

import Joi from 'joi';

const addTocartVal = Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().options({convert:false})
});


const QueryIdVal = Joi.object({
    id:Joi.string().hex().length(24).required()
});


const updateQuVal = Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().required().options({convert:false})
});
// const updateReviewVal = Joi.object({
//     id:Joi.string().hex().length(24).required(),
//     text:Joi.string().min(3),
//     rating:Joi.number().min(0).max(5),

// });
export {
    addTocartVal,
    QueryIdVal,
    updateQuVal
}



/*

fieldname:Joi. string(). required(),
originalname: Joi.string(). required(), 
encoding: Joi. string(). required(), 
mimetype: Joi string(). valid( 'image/jpeg’,’image/png’).required(),
 size: Joi.number().max(5242880).required(), 
destination: Joi. string(). required(), 
filename: Joi. string(). required(), 
path: Joi. string(). required()



*/