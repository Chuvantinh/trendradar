/*
  Warnings:

  - Made the column `content` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedBy" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedBy" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trend" ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "deletedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TrendEvalution" ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedBy" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TrendSource" ALTER COLUMN "createdBy" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "updatedBy" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT,
ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;
