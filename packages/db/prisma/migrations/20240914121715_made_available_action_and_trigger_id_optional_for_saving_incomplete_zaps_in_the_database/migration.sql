-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_availableActionId_fkey";

-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "availableActionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ALTER COLUMN "availableTriggerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Zap" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_availableActionId_fkey" FOREIGN KEY ("availableActionId") REFERENCES "AvailableAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
