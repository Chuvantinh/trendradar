/*
  Warnings:

  - The primary key for the `CategoriesOnTrend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `CategoriesOnTrend` table. All the data in the column will be lost.
  - Added the required column `catId` to the `CategoriesOnTrend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnTrend" DROP CONSTRAINT "CategoriesOnTrend_categoryId_fkey";

-- AlterTable
ALTER TABLE "CategoriesOnTrend" DROP CONSTRAINT "CategoriesOnTrend_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "catId" INTEGER NOT NULL,
ADD PRIMARY KEY ("trendId", "catId");

-- AddForeignKey
ALTER TABLE "CategoriesOnTrend" ADD FOREIGN KEY ("catId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
