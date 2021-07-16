/*
  Warnings:

  - You are about to drop the column `trendId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_trendId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "trendId";

-- CreateTable
CREATE TABLE "CategoriesOnTrend" (
    "trendId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("trendId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnTrend" ADD FOREIGN KEY ("trendId") REFERENCES "Trend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnTrend" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
