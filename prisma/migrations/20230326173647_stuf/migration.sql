/*
  Warnings:

  - You are about to drop the `QuestsOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestsOnUser" DROP CONSTRAINT "QuestsOnUser_questName_fkey";

-- DropForeignKey
ALTER TABLE "QuestsOnUser" DROP CONSTRAINT "QuestsOnUser_userId_fkey";

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "questGiver" DROP NOT NULL,
ALTER COLUMN "uespLink" DROP NOT NULL,
ALTER COLUMN "reward" DROP NOT NULL;

-- DropTable
DROP TABLE "QuestsOnUser";
