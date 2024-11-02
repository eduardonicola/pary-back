/*
  Warnings:

  - You are about to drop the column `eventId` on the `Spent` table. All the data in the column will be lost.
  - Added the required column `uuid_event` to the `Spent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Spent" DROP CONSTRAINT "Spent_eventId_fkey";

-- AlterTable
ALTER TABLE "Spent" DROP COLUMN "eventId",
ADD COLUMN     "uuid_event" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "Spent" ADD CONSTRAINT "Spent_uuid_event_fkey" FOREIGN KEY ("uuid_event") REFERENCES "Event"("uuid_event") ON DELETE CASCADE ON UPDATE CASCADE;
