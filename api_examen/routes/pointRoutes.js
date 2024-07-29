import { Router } from 'express';
import { pointControllers } from '../controllers/pointControllers.js';
import { pointSchema } from '../schemas/pointSchemas.js';
import validateRequest from '../middlewares/validations.js';

export const pointRoutes = () => {
    const pointRouter = Router();
    const { getPoints, createPoint, getPointById, deletePointById, updatePointById } = pointControllers();

    pointRouter.route('/points')
        .get(getPoints)
        .post(validateRequest(pointSchema), createPoint);

    pointRouter.route('/points/:id')
        .get(getPointById)
        .delete(deletePointById)
        .patch(validateRequest(pointSchema), updatePointById);

    return pointRouter;
};
