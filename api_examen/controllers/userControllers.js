// Importamos PrismaClient para interactuar con la base de datos
import { PrismaClient } from "@prisma/client"

// Importamos los códigos de estado HTTP desde un archivo de ayuda
import HTTP_STATUS from "../helpers/httpStatus.js";

// Importamos funciones para manejar contraseñas y tokens
import { hashPassword, comparePassword  } from '../utils/bcrypt.js'; 
import { generateToken } from '../utils/jwt.js'; 

// Creamos una instancia de PrismaClient para interactuar con la base de datos
const prisma = new PrismaClient()

// Exportamos una función que retorna los controladores de usuario
export const userControllers = () => {
    // Controlador para obtener todos los usuarios
    const getUser = async (_req, res, next) => {
        try {
            // Consultamos todos los usuarios en la base de datos
            const users = await prisma.user.findMany();
            // Respondemos con los usuarios y un estado 200 (OK)
            return res.status(HTTP_STATUS.OK).json(users);
        } catch (error) {
            // Pasamos el error al siguiente middleware de manejo de errores
            next(error);
        } finally {
            // Cerramos la conexión con la base de datos
            await prisma.$disconnect();
        }
    };

    // Controlador para crear un nuevo usuario
    const createUser = async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            // Hasheamos la contraseña del usuario
            const hashedPassword = await hashPassword(password);
            // Creamos un nuevo usuario en la base de datos
            const createdUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            // Generamos un token para el nuevo usuario
            const token = generateToken({ id: createdUser.id, email: createdUser.email });
            // Respondemos con el usuario creado y el token, y un estado 201 (Created)
            return res.status(HTTP_STATUS.CREATED).json({ user: createdUser, token });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    // Controlador para obtener un usuario por ID
    const getUserById = async (req, res, next) => {
        const { id } = req.params;
        try {
            // Consultamos un usuario específico por ID
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: {
                    points: true,
                    rewardRedemptions: true,
                    recyclingActivities: true,
                },
            });
            if (!user) {
                // Si el usuario no existe, respondemos con un estado 404 (Not Found)
                return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
            }
            // Respondemos con el usuario y un estado 200 (OK)
            return res.status(HTTP_STATUS.OK).json(user);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    

    // Controlador para eliminar un usuario por ID
    const deleteById = async (req, res, next) => {
        const { id } = req.params;
        try {
            // Consultamos si el usuario existe
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) {
                // Si el usuario no existe, respondemos con un estado 404 (Not Found)
                return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'El usuario no existe' });
            }
            // Eliminamos el usuario de la base de datos
            const deletedUser = await prisma.user.delete({
                where: { id: Number(id) },
            });
            // Respondemos con el usuario eliminado y un estado 200 (OK)
            return res.status(HTTP_STATUS.OK).json(deletedUser);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    

    // Controlador para actualizar un usuario por ID
    const updateById = async (req, res, next) => {
        const { id } = req.params;
        const newUserData = req.body;
        try {
            // Actualizamos el usuario en la base de datos con los nuevos datos
            const updatedUser = await prisma.user.update({
                where: { id: Number(id) },
                data: newUserData,
            });
            // Respondemos con el usuario actualizado y un estado 200 (OK)
            return res.status(HTTP_STATUS.OK).json(updatedUser);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    

    return {
        getUser,
        createUser,
        getUserById,
        deleteById,
        updateById
    }
}