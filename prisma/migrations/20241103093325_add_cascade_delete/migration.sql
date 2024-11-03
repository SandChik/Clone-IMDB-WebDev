-- DropForeignKey
ALTER TABLE "ActorToDrama" DROP CONSTRAINT "ActorToDrama_actorId_fkey";

-- DropForeignKey
ALTER TABLE "ActorToDrama" DROP CONSTRAINT "ActorToDrama_dramaId_fkey";

-- DropForeignKey
ALTER TABLE "DramaToGenres" DROP CONSTRAINT "DramaToGenres_dramaId_fkey";

-- DropForeignKey
ALTER TABLE "DramaToGenres" DROP CONSTRAINT "DramaToGenres_genreId_fkey";

-- AddForeignKey
ALTER TABLE "ActorToDrama" ADD CONSTRAINT "ActorToDrama_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActorToDrama" ADD CONSTRAINT "ActorToDrama_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DramaToGenres" ADD CONSTRAINT "DramaToGenres_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DramaToGenres" ADD CONSTRAINT "DramaToGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
