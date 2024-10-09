-- DropForeignKey
ALTER TABLE "Additional" DROP CONSTRAINT "Additional_uuid_event_fkey";

-- DropForeignKey
ALTER TABLE "Spent" DROP CONSTRAINT "Spent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasEvent" DROP CONSTRAINT "UserHasEvent_uuid_event_fkey";

-- DropForeignKey
ALTER TABLE "UserHasEvent" DROP CONSTRAINT "UserHasEvent_uuid_user_fkey";

-- AddForeignKey
ALTER TABLE "Spent" ADD CONSTRAINT "Spent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("uuid_event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasEvent" ADD CONSTRAINT "UserHasEvent_uuid_user_fkey" FOREIGN KEY ("uuid_user") REFERENCES "User"("uuid_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasEvent" ADD CONSTRAINT "UserHasEvent_uuid_event_fkey" FOREIGN KEY ("uuid_event") REFERENCES "Event"("uuid_event") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additional" ADD CONSTRAINT "Additional_uuid_event_fkey" FOREIGN KEY ("uuid_event") REFERENCES "Event"("uuid_event") ON DELETE CASCADE ON UPDATE CASCADE;
