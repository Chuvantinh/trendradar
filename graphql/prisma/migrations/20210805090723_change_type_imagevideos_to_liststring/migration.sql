/*
  Warnings:

  - The `images` column on the `Trend` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `videos` column on the `Trend` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Trend" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[],
DROP COLUMN "videos",
ADD COLUMN     "videos" TEXT[];
