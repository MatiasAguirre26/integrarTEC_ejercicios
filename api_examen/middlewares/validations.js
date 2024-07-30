// Esta función recibe un esquema de validación como parámetro
const validateRequest = (schema) => {
    // Retornamos un middleware que validará la solicitud entrante
    return (req, res, next) => {
        // Validamos el cuerpo de la solicitud (req.body) contra el esquema proporcionado
        // Usamos la opción { abortEarly: false } para obtener todos los errores de validación de una vez
        const { error } = schema.validate(req.body, { abortEarly: false });

        // Si hay errores de validación, extraemos los mensajes de error
        if (error) {
            const errors = error.details.map(detail => detail.message);
            // Respondemos con un estado 400 (Bad Request) y los mensajes de error
            return res.status(400).json({ errors });
        }

        next();
    };
};

export default validateRequest;