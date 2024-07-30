import { Router } from 'express';
import { recyclingActivityControllers } from '../controllers/recyclingActivityControllers.js';
import { recyclingActivitySchema } from '../schemas/recyclingActivitySchemas.js';
import validateRequest from '../middlewares/validations.js';

// Definimos y exportamos la función recyclingActivityRoutes
export const recyclingActivityRoutes = () => {
    const recyclingActivityRouter = Router();
     // Extraemos las funciones de recyclingActivityControllers.js
    const { getRecyclingActivities, createRecyclingActivity, getRecyclingActivityById, deleteRecyclingActivityById, updateRecyclingActivityById } = recyclingActivityControllers();
    
    // Definimos las rutas para /recycling-activities
    recyclingActivityRouter.route('/recycling-activities')
        // Ruta para obtener todas las actividades de reciclaje
        .get(getRecyclingActivities)
        // Ruta para crear una nueva actividad de reciclaje y aplicar el middleware de validación con el esquema de actividades de reciclaje
        .post(validateRequest(recyclingActivitySchema), createRecyclingActivity);

    // Definimos las rutas para /recycling-activities/:id
    recyclingActivityRouter.route('/recycling-activities/:id')
        // Ruta para obtener una actividad de reciclaje por ID
        .get(getRecyclingActivityById)
        // Ruta para eliminar una actividad de reciclaje por ID
        .delete(deleteRecyclingActivityById)
        // Ruta para actualizar una actividad de reciclaje por ID y aplicar el middleware de validación con el esquema de actividades de reciclaje
        .patch(validateRequest(recyclingActivitySchema), updateRecyclingActivityById);

    return recyclingActivityRouter;
};
