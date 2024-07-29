import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const recyclingActivityControllers = () => {

    const getRecyclingActivities = async (_req, res, next) => {
        try {
            const recyclingActivities = await prisma.recyclingActivity.findMany({
                include: {
                    user: true,
                },
            });
            return res.status(200).json(recyclingActivities);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const createRecyclingActivity = async (req, res, next) => {
        const { userId, materialType, quantity } = req.body;
        try {
            const createdRecyclingActivity = await prisma.recyclingActivity.create({
                data: {
                    user: { connect: { id: userId } },
                    materialType,
                    quantity,
                },
            });
            return res.status(201).json(createdRecyclingActivity);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const getRecyclingActivityById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const recyclingActivity = await prisma.recyclingActivity.findUnique({
                where: { id: Number(id) },
                include: {
                    user: true,
                },
            });
            if (!recyclingActivity) {
                return res.status(404).json({ error: 'Recycling Activity not found' });
            }
            return res.status(200).json(recyclingActivity);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const deleteRecyclingActivityById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedRecyclingActivity = await prisma.recyclingActivity.delete({
                where: { id: Number(id) },
            });
            return res.status(200).json(deletedRecyclingActivity);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const updateRecyclingActivityById = async (req, res, next) => {
        const { id } = req.params;
        const newRecyclingActivityData = req.body;
        try {
            const updatedRecyclingActivity = await prisma.recyclingActivity.update({
                where: { id: Number(id) },
                data: newRecyclingActivityData,
            });
            return res.status(200).json(updatedRecyclingActivity);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    return {
    getRecyclingActivities,
    createRecyclingActivity,
    getRecyclingActivityById,
    deleteRecyclingActivityById,
    updateRecyclingActivityById
    }
};
