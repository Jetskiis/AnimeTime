/*
  Warnings:

  - The `broadcast` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `aired` column on the `anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "anime" DROP COLUMN "broadcast",
ADD COLUMN     "broadcast" JSONB,
DROP COLUMN "aired",
ADD COLUMN     "aired" JSONB;
