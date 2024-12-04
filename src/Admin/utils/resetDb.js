const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resetDatabase = async () => {
  try {
    console.log("Resetting database...");

    await prisma.review.deleteMany({});
    await prisma.dramaToGenres.deleteMany({});
    await prisma.actorToDrama.deleteMany({});
    await prisma.drama.deleteMany({});
    await prisma.genre.deleteMany({});
    await prisma.actor.deleteMany({});
    await prisma.country.deleteMany({});

    console.log("Database reset complete.");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await prisma.$disconnect();
  }
};

resetDatabase();
