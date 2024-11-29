/*
  Warnings:

  - You are about to drop the column `type_additional` on the `Additional` table. All the data in the column will be lost.
  - You are about to drop the column `value_additional` on the `Additional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Additional" DROP COLUMN "type_additional",
DROP COLUMN "value_additional",
ADD COLUMN     "drink" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "food" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hard_drink" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pastime" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "TypeAdditional";
