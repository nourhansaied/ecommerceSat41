

import Joi from 'joi';

const addCouponVal = Joi.object({
    code: Joi.string().required(),
    discount:Joi.number().min(0).required(),
    expires: Joi.date().required()
});


const couponQueryIdVal = Joi.object({
    id:Joi.string().hex().length(24).required()
});

const updateCouponVal = Joi.object({
    id:Joi.string().hex().length(24).required(),
    code: Joi.string(),
    discount:Joi.number().min(0),
    expires: Joi.date()

});
export {
    addCouponVal,
    updateCouponVal,
    couponQueryIdVal
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