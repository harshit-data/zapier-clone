/*
  Warnings:

  - You are about to drop the `draftZapRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `draftZapRunOutbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "draftZapRun" DROP CONSTRAINT "draftZapRun_draftZapId_fkey";

-- DropForeignKey
ALTER TABLE "draftZapRunOutbox" DROP CONSTRAINT "draftZapRunOutbox_draftZapRunId_fkey";

-- DropTable
DROP TABLE "draftZapRun";

-- DropTable
DROP TABLE "draftZapRunOutbox";

-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "draftZapId" TEXT NOT NULL,
    "metaData" JSONB NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "draftZapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_draftZapRunId_key" ON "ZapRunOutbox"("draftZapRunId");

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_draftZapId_fkey" FOREIGN KEY ("draftZapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_draftZapRunId_fkey" FOREIGN KEY ("draftZapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
