/*
  Warnings:

  - You are about to drop the column `award` on the `Drama` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "award";

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardToCountry" (
    "awardId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "AwardToCountry_pkey" PRIMARY KEY ("awardId","countryId")
);

-- AddForeignKey
ALTER TABLE "AwardToCountry" ADD CONSTRAINT "AwardToCountry_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardToCountry" ADD CONSTRAINT "AwardToCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
