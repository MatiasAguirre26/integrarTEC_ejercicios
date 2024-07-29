import { Router } from 'express';
import { rewardControllers } from '../controllers/rewardControllers.js';
import { rewardSchema } from '../schemas/rewardSchemas.js';
import validateRequest from '../middlewares/validations.js';

export const rewardRoutes = () => {
    const rewardRouter = Router();
    const { getRewards, createReward, getRewardById, deleteRewardById, updateRewardById } = rewardControllers();

    rewardRouter.route('/rewards')
        .get(getRewards)
        .post(validateRequest(rewardSchema), createReward);

    rewardRouter.route('/rewards/:id')
        .get(getRewardById)
        .delete(deleteRewardById)
        .patch(validateRequest(rewardSchema), updateRewardById);

    return rewardRouter;
};