/*
  Warnings:

  - The `images` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "images",
ADD COLUMN     "images" JSONB;
