-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "author" DROP DEFAULT;