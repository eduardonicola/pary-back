-- CreateEnum
CREATE TYPE "TypeDivision" AS ENUM ('egalitarian', 'absorption');

-- CreateEnum
CREATE TYPE "TypeSpent" AS ENUM ('hard_drink', 'dink', 'food_omnivorous', 'food_vegan');

-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('owner', 'guest', 'manager', 'advertising');

-- CreateEnum
CREATE TYPE "TypeAdditional" AS ENUM ('location', 'hard_drink', 'dink', 'food_omnivorous', 'food_vegan', 'pastime');

-- CreateTable
CREATE TABLE "Event" (
    "uuid_event" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "locate" VARCHAR(255) NOT NULL,
    "date_and_time" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "type_division" "TypeDivision" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("uuid_event")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid_user" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid_user")
);

-- CreateTable
CREATE TABLE "Spent" (
    "uuid_spent" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "value" DECIMAL(10,2) NOT NULL,
    "amount" INTEGER NOT NULL,
    "type_spent" "TypeSpent" NOT NULL,
    "eventId" VARCHAR(36) NOT NULL,

    CONSTRAINT "Spent_pkey" PRIMARY KEY ("uuid_spent")
);

-- CreateTable
CREATE TABLE "UserHasEvent" (
    "id" BIGSERIAL NOT NULL,
    "uuid_user" VARCHAR(36) NOT NULL,
    "uuid_event" VARCHAR(36) NOT NULL,
    "user_level" "UserLevel" NOT NULL,

    CONSTRAINT "UserHasEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additional" (
    "id" BIGSERIAL NOT NULL,
    "type_additional" "TypeAdditional" NOT NULL,
    "value_additional" VARCHAR(36) NOT NULL,
    "uuid_user" VARCHAR(36) NOT NULL,
    "uuid_event" VARCHAR(36) NOT NULL,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHasEvent_uuid_user_uuid_event_key" ON "UserHasEvent"("uuid_user", "uuid_event");

-- AddForeignKey
ALTER TABLE "Spent" ADD CONSTRAINT "Spent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("uuid_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasEvent" ADD CONSTRAINT "UserHasEvent_uuid_user_fkey" FOREIGN KEY ("uuid_user") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasEvent" ADD CONSTRAINT "UserHasEvent_uuid_event_fkey" FOREIGN KEY ("uuid_event") REFERENCES "Event"("uuid_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additional" ADD CONSTRAINT "Additional_uuid_user_fkey" FOREIGN KEY ("uuid_user") REFERENCES "User"("uuid_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additional" ADD CONSTRAINT "Additional_uuid_event_fkey" FOREIGN KEY ("uuid_event") REFERENCES "Event"("uuid_event") ON DELETE RESTRICT ON UPDATE CASCADE;
