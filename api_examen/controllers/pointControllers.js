import { PrismaClient } from "@prisma/client"
import HTTP_STATUS from "../helpers/httpStatus.js";

const prisma = new PrismaClient()

export const pointControllers = () => {
    const getPoints = async (_req, res, next) => {
        try {
            const points = await prisma.point.findMany();
            return res.status(HTTP_STATUS.OK).json(points);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const createPoint = async (req, res, next) => {
        const { userId, amount, description } = req.body;
        try {
            const createdPoint = await prisma.point.create({
                data: {
                    userId,
                    amount,
                    description,
                },
            });
            return res.status(HTTP_STATUS.CREATED).json(createdPoint);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const getPointById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const point = await prisma.point.findUnique({
                where: { id: Number(id) },
            });
            if (!point) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Point not found' });
            }
            return res.status(HTTP_STATUS.OK).json(point);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const deletePointById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedPoint = await prisma.point.delete({
                where: { id: Number(id) },
            });
            return res.status(HTTP_STATUS.OK).json(deletedPoint);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };
    
    const updatePointById = async (req, res, next) => {
        const { id } = req.params;
        const newPointData = req.body;
        try {
            const updatedPoint = await prisma.point.update({
                where: { id: Number(id) },
                data: newPointData,
            });
            return res.status(HTTP_STATUS.OK).json(updatedPoint);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    return {
        getPoints,
        createPoint,
        getPointById,
        deletePointById,
        updatePointById,
    };
};