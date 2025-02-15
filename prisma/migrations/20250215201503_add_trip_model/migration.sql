/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt";

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
