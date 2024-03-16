

import Joi from 'joi';

const addBrandSchema = Joi.object({
    title:Joi.string().min(3).required(),
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
});


const brandIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
});

const updateBrandSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    title:Joi.string().min(3).required()
});
export {
    addBrandSchema,
    brandIdSchema,
    updateBrandSchema
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