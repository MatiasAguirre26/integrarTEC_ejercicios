import { PrismaClient } from "@prisma/client";
import HTTP_STATUS from "../helpers/httpStatus.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authControllers = () => {
    const registerUser = async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(HTTP_STATUS.CONFLICT).json({ error: 'Email already in use' });
            }

            const hashedPassword = await hashPassword(password);
            const createdUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            const token = jwt.sign({ userId: createdUser.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(HTTP_STATUS.CREATED).json({ token });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const loginUser = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid email or password' });
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid email or password' });
            }
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(HTTP_STATUS.OK).json({ token });
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    return {
        registerUser,
        loginUser,
    };
};
