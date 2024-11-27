/*
  Warnings:

  - The values [advertising] on the enum `UserLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserLevel_new" AS ENUM ('owner', 'guest', 'manager');
ALTER TABLE "UserHasEvent" ALTER COLUMN "user_level" TYPE "UserLevel_new" USING ("user_level"::text::"UserLevel_new");
ALTER TYPE "UserLevel" RENAME TO "UserLevel_old";
ALTER TYPE "UserLevel_new" RENAME TO "UserLevel";
DROP TYPE "UserLevel_old";
COMMIT;
