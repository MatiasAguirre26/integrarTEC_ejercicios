// Importamos Router de express para crear nuevas rutas
import { Router } from 'express';

// Importamos los controladores de autenticación
import { authControllers } from '../controllers/authControllers.js';

// Definimos y exportamos la función authRoutes
export const authRoutes = () => {
    // Creamos una nueva instancia de Router
    const authRouter = Router();

    // Extraemos las funciones de registro y login de authControllers.js
    const { registerUser, loginUser } = authControllers();


    // Definimos la ruta para registrar (la ruta es /auth/register)
    authRouter.post('/register', registerUser);

    // Definimos la ruta para iniciar sesión (la ruta es /auth/login)
    authRouter.post('/login', loginUser);

    return authRouter;
};