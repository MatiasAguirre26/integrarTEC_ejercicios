//Ruta con redireccion hacia los controllers, usando los endpoints

import { Router } from 'express';
import { userControllers } from '../controllers/userControllers.js';
import { userSchema } from '../schemas/userSchemas.js';
import validateRequest from '../middlewares/validations.js';


export const userRoutes = () => {
    const userRouter = Router()
    const { getUser, createUser, getUserById, deleteById, updateById } = userControllers() //Llamamos al controlador para traer la funcion de getUser


    userRouter.route('/user')//Para agrupar todos los metodos con los endpoints que son (user)
        .get(getUser)
        .post(validateRequest(userSchema), createUser)

    userRouter.route('/user/:id')
        .get(getUserById)
        .delete(deleteById)
        .patch(validateRequest(userSchema), updateById)
    return userRouter;
}