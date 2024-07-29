// const validateRequest = (schema) => {
//     return (req, res, next) => {
//         const { error } = schema.validate(req.body, { abortEarly: false });

//         if (error) {
//             const errors = error.details.map(detail => detail.message);
//             return res.status(400).json({ errors });
//         }

//         next();
//     };
// };

// export default validateRequest;


// export const validateRequest = (schema) => async (request, response, next) => {
//     const { error } = schema.validate({
//       body: request.body,
//       params: request.params,
//       query: request.query
//     }, {
//       abortEarly: false,
//       allowUnknown: true
//     })
    
//     error ? next(error) : next()
//   }


const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        next();
    };
};

export default validateRequest;