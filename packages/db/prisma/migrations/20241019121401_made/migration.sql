/*
  Warnings:

  - Added the required column `actionEventId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerEventId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "actionEventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "triggerEventId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerEventId_fkey" FOREIGN KEY ("triggerEventId") REFERENCES "TriggerEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionEventId_fkey" FOREIGN KEY ("actionEventId") REFERENCES "ActionEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
