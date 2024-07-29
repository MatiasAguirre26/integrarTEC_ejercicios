import { Router } from 'express';
import { userControllers } from '../controllers/userControllers.js';

const { loginUser } = userControllers();

const authRouter = Router();

authRouter.post('/login', loginUser);

export default authRouter;
