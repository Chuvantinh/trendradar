-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DEACTIVE');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "status" "Status";
