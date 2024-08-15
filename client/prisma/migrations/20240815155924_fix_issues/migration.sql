/*
  Warnings:

  - You are about to drop the column `isPrevSeason` on the `anime` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashed_password]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "isPrevSeason";

-- CreateIndex
CREATE UNIQUE INDEX "user_hashed_password_key" ON "user"("hashed_password");
