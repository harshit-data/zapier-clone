/*
  Warnings:

  - A unique constraint covering the columns `[draftZapId]` on the table `Zap` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `draftZapId` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DraftZap" DROP CONSTRAINT "DraftZap_zapId_fkey";

-- AlterTable
ALTER TABLE "Zap" ADD COLUMN     "draftZapId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Zap_draftZapId_key" ON "Zap"("draftZapId");

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_draftZapId_fkey" FOREIGN KEY ("draftZapId") REFERENCES "DraftZap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
