/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Quest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quest_value_key" ON "Quest"("value");
