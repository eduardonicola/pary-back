/*
  Warnings:

  - The values [food_omnivorous,food_vegan] on the enum `TypeAdditional` will be removed. If these variants are still used in the database, this will fail.
  - The values [food_omnivorous,food_vegan] on the enum `TypeSpent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeAdditional_new" AS ENUM ('hard_drink', 'dink', 'food', 'pastime');
ALTER TABLE "Additional" ALTER COLUMN "type_additional" TYPE "TypeAdditional_new" USING ("type_additional"::text::"TypeAdditional_new");
ALTER TYPE "TypeAdditional" RENAME TO "TypeAdditional_old";
ALTER TYPE "TypeAdditional_new" RENAME TO "TypeAdditional";
DROP TYPE "TypeAdditional_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TypeSpent_new" AS ENUM ('hard_drink', 'dink', 'food', 'location');
ALTER TABLE "Spent" ALTER COLUMN "type_spent" TYPE "TypeSpent_new" USING ("type_spent"::text::"TypeSpent_new");
ALTER TYPE "TypeSpent" RENAME TO "TypeSpent_old";
ALTER TYPE "TypeSpent_new" RENAME TO "TypeSpent";
DROP TYPE "TypeSpent_old";
COMMIT;
