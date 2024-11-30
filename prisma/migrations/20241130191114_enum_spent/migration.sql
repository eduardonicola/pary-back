/*
  Warnings:

  - The values [dink] on the enum `TypeSpent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeSpent_new" AS ENUM ('hard_drink', 'drink', 'food', 'location', 'pastime');
ALTER TABLE "Spent" ALTER COLUMN "type_spent" TYPE "TypeSpent_new" USING ("type_spent"::text::"TypeSpent_new");
ALTER TYPE "TypeSpent" RENAME TO "TypeSpent_old";
ALTER TYPE "TypeSpent_new" RENAME TO "TypeSpent";
DROP TYPE "TypeSpent_old";
COMMIT;
