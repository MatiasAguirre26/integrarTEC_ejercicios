import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const rewardRedemptionControllers = () => {

    const getRewardRedemptions = async (_req, res, next) => {
        try {
            const rewardRedemptions = await prisma.rewardRedemption.findMany({
                include: {
                    user: true,
                    reward: true,
                },
            });
            return res.status(200).json(rewardRedemptions);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const createRewardRedemption = async (req, res, next) => {
        const { userId, rewardId } = req.body;
        try {
            const createdRewardRedemption = await prisma.rewardRedemption.create({
                data: {
                    user: { connect: { id: userId } },
                    reward: { connect: { id: rewardId } },
                },
            });
            return res.status(201).json(createdRewardRedemption);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const getRewardRedemptionById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const rewardRedemption = await prisma.rewardRedemption.findUnique({
                where: { id: Number(id) },
                include: {
                    user: true,
                    reward: true,
                },
            });
            if (!rewardRedemption) {
                return res.status(404).json({ error: 'Reward Redemption not found' });
            }
            return res.status(200).json(rewardRedemption);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const deleteRewardRedemptionById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedRewardRedemption = await prisma.rewardRedemption.delete({
                where: { id: Number(id) },
            });
            return res.status(200).json(deletedRewardRedemption);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const updateRewardRedemptionById = async (req, res, next) => {
        const { id } = req.params;
        const newRewardRedemptionData = req.body;
        try {
            const updatedRewardRedemption = await prisma.rewardRedemption.update({
                where: { id: Number(id) },
                data: newRewardRedemptionData,
            });
            return res.status(200).json(updatedRewardRedemption);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    return {
    getRewardRedemptions,
    createRewardRedemption,
    getRewardRedemptionById,
    deleteRewardRedemptionById,
    updateRewardRedemptionById
    }
};
