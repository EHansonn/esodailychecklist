/*
  Warnings:

  - Made the column `description` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questGiver` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uespLink` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reward` on table `Quest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "questGiver" SET NOT NULL,
ALTER COLUMN "uespLink" SET NOT NULL,
ALTER COLUMN "reward" SET NOT NULL;
