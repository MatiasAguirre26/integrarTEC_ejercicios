import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const rewardControllers = () => {
    const getRewards = async (_req, res, next) => {
        try {
            const rewards = await prisma.reward.findMany();
            return res.status(200).json(rewards);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const createReward = async (req, res, next) => {
        const { name, description, requiredPoints } = req.body;
        try {
            const createdReward = await prisma.reward.create({
                data: {
                    name,
                    description,
                    requiredPoints,
                },
            });
            return res.status(201).json(createdReward);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const getRewardById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const reward = await prisma.reward.findUnique({
                where: { id: Number(id) },
                include: {
                    rewardRedemptions: true,
                },
            });
            if (!reward) {
                return res.status(404).json({ error: 'Reward not found' });
            }
            return res.status(200).json(reward);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const deleteRewardById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const deletedReward = await prisma.reward.delete({
                where: { id: Number(id) },
            });
            return res.status(200).json(deletedReward);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    const updateRewardById = async (req, res, next) => {
        const { id } = req.params;
        const newRewardData = req.body;
        try {
            const updatedReward = await prisma.reward.update({
                where: { id: Number(id) },
                data: newRewardData,
            });
            return res.status(200).json(updatedReward);
        } catch (error) {
            next(error);
        } finally {
            await prisma.$disconnect();
        }
    };

    return {
    getRewards,
    createReward,
    getRewardById,
    deleteRewardById,
    updateRewardById,
    }
};