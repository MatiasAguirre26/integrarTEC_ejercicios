import { Router } from 'express';
import { authControllers } from '../controllers/authControllers.js';

export const authRoutes = () => {
    const authRouter = Router();
    const { registerUser, loginUser } = authControllers();

    authRouter.post('/register', registerUser);
    authRouter.post('/login', loginUser);

    return authRouter;
};