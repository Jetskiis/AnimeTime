/*
  Warnings:

  - The `genres` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studios` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `title` on table `anime` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "anime" ALTER COLUMN "title" SET NOT NULL,
DROP COLUMN "genres",
ADD COLUMN     "genres" JSONB[],
DROP COLUMN "studios",
ADD COLUMN     "studios" JSONB[];
