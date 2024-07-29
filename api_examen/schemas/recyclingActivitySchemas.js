import Joi from 'joi';

export const recyclingActivitySchema = Joi.object({
    userId: Joi.number().integer().required(),
    materialType: Joi.string().min(3).max(50).required(),
    quantity: Joi.number().integer().min(1).required(),
});
