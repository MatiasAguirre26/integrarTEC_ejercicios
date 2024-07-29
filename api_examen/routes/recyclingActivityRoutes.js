import { Router } from 'express';
import { recyclingActivityControllers } from '../controllers/recyclingActivityControllers.js';
import { recyclingActivitySchema } from '../schemas/recyclingActivitySchemas.js';
import validateRequest from '../middlewares/validations.js';

export const recyclingActivityRoutes = () => {
    const recyclingActivityRouter = Router();
    const { getRecyclingActivities, createRecyclingActivity, getRecyclingActivityById, deleteRecyclingActivityById, updateRecyclingActivityById } = recyclingActivityControllers();

    recyclingActivityRouter.route('/recycling-activities')
        .get(getRecyclingActivities)
        .post(validateRequest(recyclingActivitySchema), createRecyclingActivity);

    recyclingActivityRouter.route('/recycling-activities/:id')
        .get(getRecyclingActivityById)
        .delete(deleteRecyclingActivityById)
        .patch(validateRequest(recyclingActivitySchema), updateRecyclingActivityById);

    return recyclingActivityRouter;
};
