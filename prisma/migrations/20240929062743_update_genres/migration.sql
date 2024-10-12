/*
  Warnings:

  - You are about to drop the column `genres` on the `Drama` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "genres";

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DramaToGenres" (
    "dramaId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "DramaToGenres_pkey" PRIMARY KEY ("dramaId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "DramaToGenres" ADD CONSTRAINT "DramaToGenres_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DramaToGenres" ADD CONSTRAINT "DramaToGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
