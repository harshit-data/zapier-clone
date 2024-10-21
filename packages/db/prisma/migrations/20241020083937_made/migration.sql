/*
  Warnings:

  - You are about to drop the column `draftZapId` on the `ZapRun` table. All the data in the column will be lost.
  - You are about to drop the column `draftZapRunId` on the `ZapRunOutbox` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zapRunId]` on the table `ZapRunOutbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zapId` to the `ZapRun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapRunId` to the `ZapRunOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_draftZapId_fkey";

-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_draftZapRunId_fkey";

-- DropIndex
DROP INDEX "ZapRunOutbox_draftZapRunId_key";

-- AlterTable
ALTER TABLE "ZapRun" DROP COLUMN "draftZapId",
ADD COLUMN     "zapId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "draftZapRunId",
ADD COLUMN     "zapRunId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRunId_key" ON "ZapRunOutbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
