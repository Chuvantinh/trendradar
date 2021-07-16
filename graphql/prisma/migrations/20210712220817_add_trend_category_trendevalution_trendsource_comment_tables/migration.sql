-- CreateEnum
CREATE TYPE "Sources" AS ENUM ('Media', 'Publication', 'Internet', 'Database', 'Company', 'Paten', 'Seminar', 'Trade', 'Conferences', 'Travel', 'ExtendNetwork');

-- CreateTable
CREATE TABLE "Trend" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedBy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL DEFAULT 0,
    "trendId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedBy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrendEvalution" (
    "id" SERIAL NOT NULL,
    "trendId" INTEGER NOT NULL,
    "effect" DOUBLE PRECISION,
    "probability" DOUBLE PRECISION,
    "during" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedBy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrendSource" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "source" "Sources"[],
    "trendId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedBy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "trendID" INTEGER NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedBy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trend_createdBy_unique" ON "Trend"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Trend_updatedBy_unique" ON "Trend"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Trend_deletedBy_unique" ON "Trend"("deletedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Category_createdBy_unique" ON "Category"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Category_updatedBy_unique" ON "Category"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Category_deletedBy_unique" ON "Category"("deletedBy");

-- CreateIndex
CREATE UNIQUE INDEX "TrendEvalution_trendId_unique" ON "TrendEvalution"("trendId");

-- CreateIndex
CREATE UNIQUE INDEX "TrendEvalution_createdBy_unique" ON "TrendEvalution"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "TrendEvalution_updatedBy_unique" ON "TrendEvalution"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "TrendEvalution_deletedBy_unique" ON "TrendEvalution"("deletedBy");

-- CreateIndex
CREATE UNIQUE INDEX "TrendSource_createdBy_unique" ON "TrendSource"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "TrendSource_updatedBy_unique" ON "TrendSource"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "TrendSource_deletedBy_unique" ON "TrendSource"("deletedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_trendID_unique" ON "Comment"("trendID");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_createdBy_unique" ON "Comment"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_updatedBy_unique" ON "Comment"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_deletedBy_unique" ON "Comment"("deletedBy");

-- AddForeignKey
ALTER TABLE "Trend" ADD FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trend" ADD FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trend" ADD FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY ("trendId") REFERENCES "Trend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendEvalution" ADD FOREIGN KEY ("trendId") REFERENCES "Trend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendEvalution" ADD FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendEvalution" ADD FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendEvalution" ADD FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendSource" ADD FOREIGN KEY ("trendId") REFERENCES "Trend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendSource" ADD FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendSource" ADD FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrendSource" ADD FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("trendID") REFERENCES "Trend"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
