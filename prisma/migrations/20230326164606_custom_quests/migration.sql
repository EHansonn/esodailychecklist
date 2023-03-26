-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
