import { Router } from 'express';

// Importamos los controladores de puntos
import { pointControllers } from '../controllers/pointControllers.js';

// Importamos el esquema de validación de puntos
import { pointSchema } from '../schemas/pointSchemas.js';

// Importamos el middleware de validación de solicitudes
import validateRequest from '../middlewares/validations.js';

// Definimos y exportamos la función pointRoutes
export const pointRoutes = () => {
    // Creamos una nueva instancia de Router
    const pointRouter = Router();

    // Extraemos las funciones de pointControllers.js
    const { getPoints, createPoint, getPointById, deletePointById, updatePointById } = pointControllers();

    // Definimos las rutas para /points
    pointRouter.route('/points')
        // Ruta para obtener todos los puntos
        .get(getPoints)
        // Ruta para crear un nuevo punto y aplicar el middleware de validación con el esquema de puntos
        .post(validateRequest(pointSchema), createPoint);

    // Definimos las rutas para /points/:id
    pointRouter.route('/points/:id')
        // Ruta para obtener un punto por ID
        .get(getPointById)
        // Ruta para eliminar un punto por ID
        .delete(deletePointById)
        // Ruta para actualizar un punto por ID y aplicar el middleware de validación con el esquema de puntos
        .patch(validateRequest(pointSchema), updatePointById);

    return pointRouter;
};
