// Definimos y exportamos el middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
    // Registramos el stack trace del error en la consola
    console.error(err.stack);
    // Respondemos con un estado 500 (Internal Server Error)
    res.status(500).send('Algo salió mal!');
    return
  };
  
export default errorHandler;