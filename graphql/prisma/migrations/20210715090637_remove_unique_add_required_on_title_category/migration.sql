/*
  Warnings:

  - Made the column `title` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Category.title_unique";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "title" SET NOT NULL;
