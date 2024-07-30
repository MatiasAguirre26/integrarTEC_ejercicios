import { Router } from 'express';
import { userControllers } from '../controllers/userControllers.js';

export const authRoutes = () => {
    const authRouter = Router();
    const {loginUser } = userControllers();

    
    authRouter.post('/login', loginUser);

    return authRouter;
};