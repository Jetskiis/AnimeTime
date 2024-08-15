/*
  Warnings:

  - You are about to drop the `_AnimeToUserList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnimeToUserList" DROP CONSTRAINT "_AnimeToUserList_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimeToUserList" DROP CONSTRAINT "_AnimeToUserList_B_fkey";

-- DropTable
DROP TABLE "_AnimeToUserList";
