/*
  Warnings:

  - Added the required column `category` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questGiver` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeatable` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uespLink` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "questGiver" TEXT NOT NULL,
ADD COLUMN     "repeatable" TEXT NOT NULL,
ADD COLUMN     "reward" TEXT NOT NULL,
ADD COLUMN     "uespLink" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
