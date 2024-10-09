/*
  Warnings:

  - Added the required column `passsword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passsword" VARCHAR(255) NOT NULL;
