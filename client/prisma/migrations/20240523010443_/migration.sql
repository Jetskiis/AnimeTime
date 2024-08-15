/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `anime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category]` on the table `seasons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `seasons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_season_fkey";

-- AlterTable
ALTER TABLE "anime" ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "category" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "anime_id_key" ON "anime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_category_key" ON "seasons"("category");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_category_fkey" FOREIGN KEY ("category") REFERENCES "seasons"("category") ON DELETE RESTRICT ON UPDATE CASCADE;
