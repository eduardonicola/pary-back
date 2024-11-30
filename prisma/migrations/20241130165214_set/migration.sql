/*
  Warnings:

  - The primary key for the `Additional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Additional` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `UserHasEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserHasEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Additional" DROP CONSTRAINT "Additional_pkey";

ALTER TABLE "Additional" ALTER COLUMN "id" TYPE INTEGER USING "id"::INTEGER;

ALTER TABLE "Additional" ALTER COLUMN "id" SET DEFAULT nextval('"Additional_id_seq"');

ALTER TABLE "Additional" ADD CONSTRAINT "Additional_pkey" PRIMARY KEY ("id");


-- AlterTable
ALTER TABLE "UserHasEvent" DROP CONSTRAINT "UserHasEvent_pkey";

ALTER TABLE "UserHasEvent" ALTER COLUMN "id" TYPE INTEGER USING "id"::INTEGER;

ALTER TABLE "UserHasEvent" ALTER COLUMN "id" SET DEFAULT nextval('"UserHasEvent_id_seq"');

ALTER TABLE "UserHasEvent" ADD CONSTRAINT "UserHasEvent_pkey" PRIMARY KEY ("id");

