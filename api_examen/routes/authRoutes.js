import { Router } from 'express';
import { userControllers } from '../controllers/userControllers.js';

export const authRoutes = () => {
    const authRouter = Router();
    const { _register, loginUser } = userControllers();

    //authRouter.post('/register', register);
    authRouter.post('/login', loginUser);

    return authRouter;
};