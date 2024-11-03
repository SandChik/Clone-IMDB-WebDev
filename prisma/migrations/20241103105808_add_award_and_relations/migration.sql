/*
  Warnings:

  - Added the required column `dramaId` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "dramaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;
