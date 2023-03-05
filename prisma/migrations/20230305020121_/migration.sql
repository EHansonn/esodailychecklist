/*
  Warnings:

  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `Task` table. All the data in the column will be lost.
  - Added the required column `questName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "name",
DROP COLUMN "reward",
DROP COLUMN "type",
DROP COLUMN "zone",
ADD COLUMN     "questName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Quest" (
    "value" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("value")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quest_value_key" ON "Quest"("value");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_questName_fkey" FOREIGN KEY ("questName") REFERENCES "Quest"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
