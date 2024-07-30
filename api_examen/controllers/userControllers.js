import { PrismaClient } from "@prisma/client"
import HTTP_STATUS from "../helpers/httpStatus.js";
import { hashPassword, comparePassword  } from '../utils/bcrypt.js'; 
import { generateToken } from '../utils/jwt.js'; 

const prisma = new PrismaClient()

export const userControllers = () => {
    const getUser = async (_req, res, next) => {
        try {
            const users = await prisma.user.findMany();
            return res.status(HTTP_STATUS.OK).json(users);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const createUser = async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = await hashPassword(password);
            const createdUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            const token = generateToken({ id: createdUser.id, email: createdUser.email });
            
            return res.status(HTTP_STATUS.CREATED).json({ user: createdUser, token });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    // const loginUser = async (req, res, next) => {
    //     const { email, password } = req.body;
    //     try {
    //         const user = await prisma.user.findUnique({
    //             where: { email },
    //         });

    //         if (!user) {
    //             return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    //         }

    //         const isPasswordValid = await comparePassword(password, user.password);

    //         if (!isPasswordValid) {
    //             return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    //         }

    //         const token = generateToken({ id: user.id, email: user.email });

    //         return res.status(HTTP_STATUS.OK).json({ user, token });
    //     } catch (error) {
    //         next(error);
    //     } finally {
    //         await prisma.$disconnect();
    //     }
    // };

    const getUserById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: {
                    points: true,
                    rewardRedemptions: true,
                    recyclingActivities: true,
                },
            });
            if (!user) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
            }
            return res.status(HTTP_STATUS.OK).json(user);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const deleteById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'El usuario no existe' });
            }

            const deletedUser = await prisma.user.delete({
                where: { id: Number(id) },
            });
            return res.status(HTTP_STATUS.OK).json(deletedUser);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const updateById = async (req, res, next) => {
        const { id } = req.params;
        const newUserData = req.body;
        try {
            const updatedUser = await prisma.user.update({
                where: { id: Number(id) },
                data: newUserData,
            });
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
        //loginUser,
        getUserById,
        deleteById,
        updateById
    }
}