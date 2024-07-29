/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `RecyclingActivity` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `RecyclingActivity` table. All the data in the column will be lost.
  - You are about to drop the column `tipoMaterial` on the `RecyclingActivity` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCreacion` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `puntosNecesarios` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `RewardRedemption` table. All the data in the column will be lost.
  - You are about to drop the column `correoElectronico` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCreacion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `puntosTotales` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `RecyclingActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materialType` to the `RecyclingActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredPoints` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_correoElectronico_key";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "cantidad",
DROP COLUMN "descripcion",
DROP COLUMN "fecha",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "RecyclingActivity" DROP COLUMN "cantidad",
DROP COLUMN "fecha",
DROP COLUMN "tipoMaterial",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "materialType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reward" DROP COLUMN "descripcion",
DROP COLUMN "fechaCreacion",
DROP COLUMN "nombre",
DROP COLUMN "puntosNecesarios",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "requiredPoints" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RewardRedemption" DROP COLUMN "fecha",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "correoElectronico",
DROP COLUMN "fechaCreacion",
DROP COLUMN "nombre",
DROP COLUMN "puntosTotales",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
