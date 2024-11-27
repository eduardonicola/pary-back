/*
  Warnings:

  - Added the required column `date_stop_sub` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date_stop_sub" TIMESTAMP(3) NOT NULL;
