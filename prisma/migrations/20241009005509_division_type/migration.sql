/*
  Warnings:

  - You are about to drop the column `type_division` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "type_division",
ADD COLUMN     "egalitarian" BOOLEAN NOT NULL DEFAULT true;
