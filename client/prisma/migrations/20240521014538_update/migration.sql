/*
  Warnings:

  - Added the required column `updatedAt` to the `seasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
