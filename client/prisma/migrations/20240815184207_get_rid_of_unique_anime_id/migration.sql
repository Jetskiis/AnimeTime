-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_entry_fkey";

-- DropIndex
DROP INDEX "anime_id_key";

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_entry_fkey" FOREIGN KEY ("entry") REFERENCES "seasons"("seasonYearCategory") ON DELETE CASCADE ON UPDATE CASCADE;
