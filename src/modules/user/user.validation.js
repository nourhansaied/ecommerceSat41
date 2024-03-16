

import Joi from 'joi';

const addUserSchema = Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    role:Joi.string().valid('user','admin'),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/).required(),
    rePassword: Joi.string().valid(Joi.ref('password')).required(),
    phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required()

    
});

const userQueryIdSchema = Joi.object({
    id:Joi.string().hex().length(24).required()
});

const updateUserSchema = Joi.object({
    id:Joi.string().hex().length(24).required(),
    name:Joi.string().min(3),
    email:Joi.string().email(),
    role:Joi.string().valid('user','admin'),
    password: Joi.string().pattern(/^[A-Z][a-z0-9]{3,8}$/),
    rePassword: Joi.string().valid(Joi.ref('password')),
    phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required()


});
export {
    addUserSchema,
    userQueryIdSchema,
    updateUserSchema
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