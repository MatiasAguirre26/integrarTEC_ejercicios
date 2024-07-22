import { PrismaClient } from "@prisma/client"

//Logica de lo que va hacer la ruta, funcionalidad

const prisma = new PrismaClient()

export const userControllers = () => {
    const getUser = async (_req,res)=> { //Funcionalidad para obtener usuarios
        try {
            const user = await prisma.user.findMany()

            return res.status(200).json(user)
        } catch(error) {
            next(error) //que valla al siguiente middleware con el error
        } finally {
            await prisma.$disconnect()
        }
    }

    const createUser = async (req,res,next) => {
        const newUser = req.body
        try {
            const createUser = await prisma.user.create({
                data: {
                    newUser
                }
            })

            const responseFormat = {
                data: createUser,
                message: 'Book retrieved successfully'
            }
            return res.status(200).json(responseFormat)
        } catch (error) {
            next(error)
        } finally {
            await prisma.$disconnect()
        }
    }

    const getUserById = async (req,res,next) => {
        const {id} = req.params
        const userId = Number(id)
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            const responseFormat = {
                data: user,
                message: 'Book retrieved successfully'
            }
            return res.status(200).json(responseFormat)
        } catch (error) {
            next(error)
        } finally {
            await prisma.$disconnect()
        }
    }

    const deleteById = async (req,res,next) => {
        const {id} = req.params
        const userId = Number(id)
        try {
            const user = await prisma.user.delete({
                where: {
                    id: userId
                }
            })

            const responseFormat = {
                data: user,
                message: 'Book delete successfully'
            }
            return res.status(200).json(responseFormat)
        } catch (error) {
            next(error)
        } finally {
            await prisma.$disconnect()
        }
    }

    const updateById = async (req,res,next) => {
        const {id} = req.params
        const userId = Number(id)
        const newUserData = req.body
        try {
            const user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: newUserData
            })

            const responseFormat = {
                data: user,
                message: 'Book delete successfully'
            }
            return res.status(200).json(responseFormat)
        } catch (error) {
            next(error)
        } finally {
            await prisma.$disconnect()
        }
    }

    return {
        getUser,
        createUser,
        getUserById,
        deleteById,
        updateById
    }
}