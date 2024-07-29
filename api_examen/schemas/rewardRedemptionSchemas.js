import Joi from 'joi';

export const rewardRedemptionSchema = Joi.object({
    userId: Joi.number().integer().required(),
    rewardId: Joi.number().integer().required(),
});