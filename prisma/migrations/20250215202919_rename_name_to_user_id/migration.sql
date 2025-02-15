/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
