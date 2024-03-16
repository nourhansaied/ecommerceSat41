

import Joi from 'joi';

const addReviewVal = Joi.object({
    text:Joi.string().min(3).required(),
    rating: Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required(),
});


const reviewQueryIdVal = Joi.object({
    id:Joi.string().hex().length(24).required()
});

const updateReviewVal = Joi.object({
    id:Joi.string().hex().length(24).required(),
    text:Joi.string().min(3),
    rating:Joi.number().min(0).max(5),

});
export {
    addReviewVal,
    updateReviewVal,
    reviewQueryIdVal
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