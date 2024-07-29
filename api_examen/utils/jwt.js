import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY; // Leer la clave secreta desde las variables de entorno

export const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Puedes ajustar el tiempo de expiración según tus necesidades
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
