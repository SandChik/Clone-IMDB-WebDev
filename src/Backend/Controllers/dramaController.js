const prisma = require("../prismaClient");

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

    // Handle genres
    const genreIds = dramaData.genres
      ? await Promise.all(
          dramaData.genres.map(async (genreName) => {
            let genre = await prisma.genre.findUnique({
              where: { name: genreName },
            });
            if (!genre) {
              genre = await prisma.genre.create({ data: { name: genreName } });
            }
            return { genreId: genre.id };
          })
        )
      : [];

    // Handle actors
    const actorIds = dramaData.actors
      ? await Promise.all(
          dramaData.actors.map(async (actorName) => {
            let actor = await prisma.actor.findUnique({
              where: { name: actorName },
            });
            if (!actor) {
              actor = await prisma.actor.create({
                data: { name: actorName, countryId: country.id },
              });
            }
            return { actorId: actor.id };
          })
        )
      : [];

    // Buat drama baru dengan status default 0 (unapprove) jika tidak disediakan
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
        status: dramaData.status !== undefined ? dramaData.status : 0, // Set default status to 0
        genres:
          genreIds.length > 0 ? { createMany: { data: genreIds } } : undefined,
        actors:
          actorIds.length > 0 ? { createMany: { data: actorIds } } : undefined,
      },
    });
    return newDrama;
  } catch (err) {
    console.error("Error creating drama:", err);
    throw err;
  }
};

const getAllDramas = async () => {
  try {
    const dramas = await prisma.drama.findMany({
      include: {
        genres: { include: { genre: true } },
        actors: { include: { actor: true } },
        country: true,
        reviews: true,
      },
    });
    return dramas;
  } catch (err) {
    console.error("Error fetching dramas:", err);
    throw err;
  }
};

const getDramaById = async (id) => {
  try {
    const drama = await prisma.drama.findUnique({
      where: { id },
      include: {
        genres: { include: { genre: true } },
        actors: { include: { actor: true } },
        reviews: true,
      },
    });
    if (!drama) throw new Error("Drama not found");
    return drama;
  } catch (err) {
    console.error("Error fetching drama by ID:", err);
    throw err;
  }
};

const getReviewsByDramaId = async (dramaId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { dramaId },
      orderBy: { createdAt: "desc" },
    });
    return reviews;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    throw err;
  }
};

const addReview = async (reviewData) => {
  try {
    const newReview = await prisma.review.create({
      data: reviewData,
    });
    return newReview;
  } catch (err) {
    console.error("Error creating review:", err);
    throw err;
  }
};

const approveDrama = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Receive the new status from the request body

  try {
    const updatedDrama = await prisma.drama.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updatedDrama);
  } catch (error) {
    console.error("Error toggling approval status:", error);
    res.status(500).json({ error: "Failed to toggle approval status" });
  }
};

// Fungsi delete drama
const deleteDrama = async (id) => {
  try {
    await prisma.drama.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error("Error deleting drama:", error);
    throw error;
  }
};

const getAllCountries = async () => {
  return await prisma.country.findMany();
};

const addCountry = async (name) => {
  const existingCountry = await prisma.country.findUnique({
    where: { name },
  });
  if (existingCountry) {
    throw new Error("Country already exists");
  }
  return await prisma.country.create({ data: { name } });
};

const deleteCountry = async (id) => {
  try {
    return await prisma.country.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error("Error deleting country:", error);
    throw error;
  }
};

module.exports = {
  addNewDrama,
  getAllDramas,
  getDramaById,
  getReviewsByDramaId,
  addReview,
  approveDrama,
  deleteDrama,
  getAllCountries,
  addCountry,
  deleteCountry
};
