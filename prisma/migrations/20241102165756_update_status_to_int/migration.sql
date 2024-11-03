/*
  Warnings:

  - The `status` column on the `Drama` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "updatedAt" DROP DEFAULT;
