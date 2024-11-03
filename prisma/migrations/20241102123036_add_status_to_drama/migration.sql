/*
  Warnings:

  - Added the required column `updatedAt` to the `Drama` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drama" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "posterUrl" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'unapprove',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "availability" DROP NOT NULL;
