const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Tambahkan data Country
  await prisma.country.createMany({
    data: [
      { id: 1, name: "USA" },
      { id: 2, name: "South Korea" },
    ],
    skipDuplicates: true, // Abaikan jika data sudah ada
  });

  console.log("Countries added");

  // Tambahkan data Actor
  await prisma.actor.createMany({
    data: [
      { id: 1, name: "John Doe", countryId: 1 },
      { id: 2, name: "Jane Smith", countryId: 2 },
    ],
    skipDuplicates: true,
  });

  console.log("Actors added");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
