/*
  Warnings:

  - Made the column `alternativeTitle` on table `Drama` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkTrailer` on table `Drama` required. This step will fail if there are existing NULL values in that column.
  - Made the column `award` on table `Drama` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Drama" ADD COLUMN     "posterUrl" TEXT NOT NULL DEFAULT 'https://example.com/default-poster.jpg',
ALTER COLUMN "alternativeTitle" SET NOT NULL,
ALTER COLUMN "linkTrailer" SET NOT NULL,
ALTER COLUMN "award" SET NOT NULL;
