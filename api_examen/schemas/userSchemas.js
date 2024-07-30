// Importamos Joi para la validación de esquemas
import Joi from 'joi';

// Definimos y exportamos el esquema de validación para el usuario
export const userSchema = Joi.object({
    // Validamos el campo name, debe ser una cadena de texto de mínimo 3 y máximo 30 caracteres, y es requerido
    name: Joi.string().min(3).max(30).required(),
    // Validamos el campo email, debe ser una cadena de texto con formato de correo electrónico, y es requerido
    email: Joi.string().email().required(),
    // Validamos el campo password, debe ser una cadena de texto de mínimo 6 caracteres, y es requerido
    password: Joi.string().min(6).required(),
});