/*
  Warnings:

  - The values [location] on the enum `TypeAdditional` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeAdditional_new" AS ENUM ('hard_drink', 'dink', 'food_omnivorous', 'food_vegan', 'pastime');
ALTER TABLE "Additional" ALTER COLUMN "type_additional" TYPE "TypeAdditional_new" USING ("type_additional"::text::"TypeAdditional_new");
ALTER TYPE "TypeAdditional" RENAME TO "TypeAdditional_old";
ALTER TYPE "TypeAdditional_new" RENAME TO "TypeAdditional";
DROP TYPE "TypeAdditional_old";
COMMIT;
