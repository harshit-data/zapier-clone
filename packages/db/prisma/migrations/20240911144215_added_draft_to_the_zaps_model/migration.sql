/*
  Warnings:

  - Added the required column `status` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Zap" ADD COLUMN     "status" TEXT NOT NULL;
