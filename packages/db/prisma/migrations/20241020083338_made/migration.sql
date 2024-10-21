/*
  Warnings:

  - You are about to drop the column `zapId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `zapId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the `ZapRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zapRunOutbox` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[draftZapId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `draftZapId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `draftZapId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_folderId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_zapId_fkey";

-- DropForeignKey
ALTER TABLE "zapRunOutbox" DROP CONSTRAINT "zapRunOutbox_zapRunId_fkey";

-- DropIndex
DROP INDEX "Trigger_zapId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "zapId",
ADD COLUMN     "draftZapId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "zapId",
ADD COLUMN     "draftZapId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "createdAt",
DROP COLUMN "folderId",
DROP COLUMN "status",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "ZapRun";

-- DropTable
DROP TABLE "zapRunOutbox";

-- CreateTable
CREATE TABLE "DraftZap" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "folderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "DraftZap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draftZapRun" (
    "id" TEXT NOT NULL,
    "draftZapId" TEXT NOT NULL,
    "metaData" JSONB NOT NULL,

    CONSTRAINT "draftZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draftZapRunOutbox" (
    "id" TEXT NOT NULL,
    "draftZapRunId" TEXT NOT NULL,

    CONSTRAINT "draftZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DraftZap_zapId_key" ON "DraftZap"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "draftZapRunOutbox_draftZapRunId_key" ON "draftZapRunOutbox"("draftZapRunId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_draftZapId_key" ON "Trigger"("draftZapId");

-- AddForeignKey
ALTER TABLE "DraftZap" ADD CONSTRAINT "DraftZap_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftZap" ADD CONSTRAINT "DraftZap_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_draftZapId_fkey" FOREIGN KEY ("draftZapId") REFERENCES "DraftZap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_draftZapId_fkey" FOREIGN KEY ("draftZapId") REFERENCES "DraftZap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draftZapRun" ADD CONSTRAINT "draftZapRun_draftZapId_fkey" FOREIGN KEY ("draftZapId") REFERENCES "DraftZap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "draftZapRunOutbox" ADD CONSTRAINT "draftZapRunOutbox_draftZapRunId_fkey" FOREIGN KEY ("draftZapRunId") REFERENCES "draftZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
