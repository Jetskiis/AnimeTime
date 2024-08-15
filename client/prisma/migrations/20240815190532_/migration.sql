/*
  Warnings:

  - The primary key for the `anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `seasons` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "anime" DROP CONSTRAINT "anime_pkey",
ADD COLUMN     "dbID" SERIAL NOT NULL,
ADD CONSTRAINT "anime_pkey" PRIMARY KEY ("dbID");

-- AlterTable
ALTER TABLE "seasons" DROP CONSTRAINT "seasons_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "seasons_pkey" PRIMARY KEY ("id");
