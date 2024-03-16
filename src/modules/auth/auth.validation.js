

import Joi from 'joi';

const signUpSchema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
    rePassword: Joi.string().valid(Joi.ref('password')).required(),
    phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required() 
});

const signInSchema = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
});

export {
    signUpSchema,
    signInSchema
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