import Joi from 'joi';

export const pointSchema = Joi.object({
    userId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    description: Joi.string().optional(),
});