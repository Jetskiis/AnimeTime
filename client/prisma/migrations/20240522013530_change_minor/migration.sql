/*
  Warnings:

  - The `genres` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studios` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "genres",
ADD COLUMN     "genres" JSONB,
DROP COLUMN "studios",
ADD COLUMN     "studios" JSONB;
