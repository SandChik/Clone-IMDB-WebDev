/*
  Warnings:

  - The primary key for the `AwardToCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[awardId,countryId]` on the table `AwardToCountry` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Award" ALTER COLUMN "dramaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AwardToCountry" DROP CONSTRAINT "AwardToCountry_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "AwardToCountry_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "AwardToCountry_awardId_countryId_key" ON "AwardToCountry"("awardId", "countryId");
