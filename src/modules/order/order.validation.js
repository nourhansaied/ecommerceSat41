

import Joi from 'joi';

const createOrderVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    shippingAddress: Joi.object({
        street: Joi.string().trim().required(),
        city: Joi.string().trim().required(),
        phone: Joi.string().trim().required(),

    }).required()
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
    createOrderVal,
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