/*
  Warnings:

  - You are about to drop the column `actors` on the `Drama` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "actors";

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "urlPhoto" TEXT,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActorToDrama" (
    "actorId" INTEGER NOT NULL,
    "dramaId" INTEGER NOT NULL,

    CONSTRAINT "ActorToDrama_pkey" PRIMARY KEY ("actorId","dramaId")
);

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorToDrama" ADD CONSTRAINT "ActorToDrama_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorToDrama" ADD CONSTRAINT "ActorToDrama_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
