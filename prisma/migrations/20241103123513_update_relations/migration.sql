/*
  Warnings:

  - The primary key for the `AwardToCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AwardToCountry` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AwardToCountry_awardId_countryId_key";

-- AlterTable
ALTER TABLE "AwardToCountry" DROP CONSTRAINT "AwardToCountry_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AwardToCountry_pkey" PRIMARY KEY ("awardId", "countryId");
