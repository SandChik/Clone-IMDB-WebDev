-- CreateTable
CREATE TABLE "Drama" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "alternativeTitle" TEXT,
    "year" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "actors" TEXT NOT NULL,
    "linkTrailer" TEXT,
    "award" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Drama_pkey" PRIMARY KEY ("id")
);
