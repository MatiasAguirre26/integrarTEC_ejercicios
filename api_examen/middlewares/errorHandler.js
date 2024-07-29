//Funcionalidad para verificar o mensajes antes de ejecutar una funcionalidad
// const ERROR_HADLERS = {
//     defaultError: (res,err) => {
//         res
//         .status(500)
//         .json({
//             success:false,
//             message:err.message
//         })
//     }
// }


// const errorHandler = (err, req, res, next) => {
//     console.err("Error handler")

//     const handler = ERROR_HADLERS[err.name] || ERROR_HADLERS.defaultError

//     handler(res, err)
// }


// export default errorHandler


const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
    return
  };
  
  export default errorHandler;