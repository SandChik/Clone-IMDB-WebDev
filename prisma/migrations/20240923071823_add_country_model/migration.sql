/*
  Warnings:

  - You are about to drop the column `country` on the `Drama` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Drama` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "country",
ADD COLUMN     "countryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- AddForeignKey
ALTER TABLE "Drama" ADD CONSTRAINT "Drama_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
