import { Router } from 'express';
import { rewardRedemptionControllers } from '../controllers/rewardRedemptionControllers.js';
import { rewardRedemptionSchema } from '../schemas/rewardRedemptionSchemas.js';
import validateRequest from '../middlewares/validations.js';

export const rewardRedemptionRoutes = () => {
    const rewardRedemptionRouter = Router();
    const { getRewardRedemptions, createRewardRedemption, getRewardRedemptionById, deleteRewardRedemptionById, updateRewardRedemptionById } = rewardRedemptionControllers();

    rewardRedemptionRouter.route('/reward-redemptions')
        .get(getRewardRedemptions)
        .post(validateRequest(rewardRedemptionSchema), createRewardRedemption);

    rewardRedemptionRouter.route('/reward-redemptions/:id')
        .get(getRewardRedemptionById)
        .delete(deleteRewardRedemptionById)
        .patch(validateRequest(rewardRedemptionSchema), updateRewardRedemptionById);

    return rewardRedemptionRouter;
};
