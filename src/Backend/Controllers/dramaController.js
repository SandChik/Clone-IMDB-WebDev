const prisma = require("../prismaClient");

// Fungsi untuk menambahkan drama baru ke database
const addNewDrama = async (dramaData) => {
  try {
    // Cari atau buat country berdasarkan nama
    let country = await prisma.country.findUnique({
      where: { name: dramaData.country },
    });

    if (!country) {
      country = await prisma.country.create({
        data: { name: dramaData.country },
      });
    }

    // Handle genres: jika ada genres, cari atau buat genre
    const genreIds = dramaData.genres
      ? await Promise.all(
          dramaData.genres.map(async (genreName) => {
            let genre = await prisma.genre.findUnique({
              where: { name: genreName },
            });

            if (!genre) {
              genre = await prisma.genre.create({
                data: { name: genreName },
              });
            }
            return { genreId: genre.id };
          })
        )
      : [];

    // Handle actors: jika ada actors, cari atau buat actor
    const actorIds = dramaData.actors
      ? await Promise.all(
          dramaData.actors.map(async (actorName) => {
            let actor = await prisma.actor.findUnique({
              where: { name: actorName },
            });

            if (!actor) {
              actor = await prisma.actor.create({
                data: {
                  name: actorName,
                  countryId: country.id, // Sertakan countryId untuk relasi
                },
              });
            }
            return { actorId: actor.id };
          })
        )
      : [];

    // Buat drama baru dengan relasi genres dan actors
    const newDrama = await prisma.drama.create({
      data: {
        title: dramaData.title,
        alternativeTitle: dramaData.alternative_title || null,
        year: parseInt(dramaData.year),
        countryId: country.id,
        synopsis: dramaData.synopsis,
        availability: dramaData.availability,
        linkTrailer: dramaData.link_trailer || null,
        award: dramaData.award || null,
        posterUrl: dramaData.posterUrl || null,
        rating: parseFloat(dramaData.rating) || null,
        duration: parseInt(dramaData.duration) || null,
        genres:
          genreIds.length > 0
            ? {
                createMany: {
                  data: genreIds,
                },
              }
            : undefined, // Jika tidak ada genre, jangan tambahkan apa-apa
        actors:
          actorIds.length > 0
            ? {
                createMany: {
                  data: actorIds,
                },
              }
            : undefined, // Jika tidak ada aktor, jangan tambahkan apa-apa
      },
    });

    console.log("Drama created successfully:", newDrama);
    return newDrama;
  } catch (err) {
    console.error("Error creating drama:", err);
    throw err;
  }
};

// Fungsi untuk mengambil semua drama beserta relasi genre dan aktor
const getAllDramas = async () => {
  try {
    const dramas = await prisma.drama.findMany({
      include: {
        genres: {
          include: { genre: true }, // Include genre details
        },
        actors: {
          include: { actor: true }, // Include actor details
        },
      },
    });
    console.log("Fetched all dramas:", dramas);
    return dramas;
  } catch (err) {
    console.error("Error fetching dramas:", err);
    throw err;
  }
};

// Fungsi untuk mengambil detail drama berdasarkan ID
const getDramaById = async (id) => {
  try {
    const drama = await prisma.drama.findUnique({
      where: { id },
      include: {
        genres: {
          include: { genre: true }, // Include genre details
        },
        actors: {
          include: { actor: true }, // Include actor details
        },
      },
    });

    if (!drama) {
      throw new Error("Drama not found");
    }

    console.log("Fetched drama by ID:", drama);
    return drama;
  } catch (err) {
    console.error("Error fetching drama by ID:", err);
    throw err;
  }
};

module.exports = {
  addNewDrama,
  getAllDramas,
  getDramaById,
};
