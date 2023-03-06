-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_questName_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_questName_fkey" FOREIGN KEY ("questName") REFERENCES "Quest"("value") ON DELETE CASCADE ON UPDATE CASCADE;
