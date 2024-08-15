/*
  Warnings:

  - You are about to drop the column `seasonYear` on the `seasons` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seasonYearCategory]` on the table `seasons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entry` to the `anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonYearCategory` to the `seasons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_category_fkey";

-- DropIndex
DROP INDEX "seasons_category_key";

-- DropIndex
DROP INDEX "seasons_seasonYear_key";

-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "entry" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "seasons" DROP COLUMN "seasonYear",
ADD COLUMN     "seasonYearCategory" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "seasons_seasonYearCategory_key" ON "seasons"("seasonYearCategory");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_entry_fkey" FOREIGN KEY ("entry") REFERENCES "seasons"("seasonYearCategory") ON DELETE RESTRICT ON UPDATE CASCADE;
