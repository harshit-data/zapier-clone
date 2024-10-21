/*
  Warnings:

  - You are about to drop the column `zapId` on the `DraftZap` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "DraftZap_zapId_key";

-- AlterTable
ALTER TABLE "DraftZap" DROP COLUMN "zapId";
