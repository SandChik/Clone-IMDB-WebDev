-- DropForeignKey
ALTER TABLE "Actor" DROP CONSTRAINT "Actor_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Drama" DROP CONSTRAINT "Drama_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_dramaId_fkey";

-- AddForeignKey
ALTER TABLE "Drama" ADD CONSTRAINT "Drama_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;
