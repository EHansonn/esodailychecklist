-- DropForeignKey
ALTER TABLE "QuestsOnUser" DROP CONSTRAINT "QuestsOnUser_questName_fkey";

-- DropForeignKey
ALTER TABLE "QuestsOnUser" DROP CONSTRAINT "QuestsOnUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "QuestsOnUser" ADD CONSTRAINT "QuestsOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestsOnUser" ADD CONSTRAINT "QuestsOnUser_questName_fkey" FOREIGN KEY ("questName") REFERENCES "Quest"("value") ON DELETE CASCADE ON UPDATE CASCADE;
