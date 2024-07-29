import Joi from 'joi';

export const rewardSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(255).optional(),
    requiredPoints: Joi.number().integer().min(1).required(),
});