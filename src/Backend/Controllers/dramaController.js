const prisma = require("../prismaClient");

const addNewDrama = async (dramaData) => {
  try {
    // Cari atau buat country berdasarkan nama
    let country = await prisma.country.findUnique({
      where: {
        name: dramaData.country, // Pastikan di sini kita mencari berdasarkan nama negara, bukan ID
      },
    });

    if (!country) {
      country = await prisma.country.create({
        data: { name: dramaData.country },
      });
    }

    // Handle genres: mencari berdasarkan ID, bukan name
    const genreIds = dramaData.genres
      ? await Promise.all(
          dramaData.genres.map(async (genreId) => {
            let genre = await prisma.genre.findUnique({
              where: { id: parseInt(genreId) }, // Mencari berdasarkan ID genre
            });
            if (!genre) {
              throw new Error(`Genre with ID ${genreId} does not exist`);
            }
            return { genreId: genre.id };
          })
        )
      : [];

    // Handle actors
    const actorIds = dramaData.actors
      ? await Promise.all(
          dramaData.actors.map(async (actorId) => {
            let actor = await prisma.actor.findUnique({
              where: { id: parseInt(actorId) }, // pastikan id adalah integer
            });
            if (!actor) {
              actor = await prisma.actor.create({
                data: { name: actorId, countryId: country.id }, // data actor
              });
            }
            return { actorId: actor.id };
          })
        )
      : [];

    // Buat drama baru
    const newDrama = await prisma.drama.create({
      data: {
        title: dramaData.title,
        alternativeTitle: dramaData.altTitle || null,
        year: parseInt(dramaData.year),
        countryId: country.id,
        synopsis: dramaData.synopsis,
        availability: dramaData.availability,
        linkTrailer: dramaData.linkTrailer || null,
        posterUrl: dramaData.posterUrl || null,
        rating: parseFloat(dramaData.rating) || null,
        duration: parseInt(dramaData.duration) || null,
        status: dramaData.status !== undefined ? dramaData.status : 0,
        genres: {
          createMany: {
            data: genreIds,
          },
        },
        actors: {
          createMany: {
            data: actorIds,
          },
        },
      },
    });

    // Relasi dengan Awards
    if (dramaData.award) {
      await prisma.award.create({
        data: {
          name: dramaData.award,
          dramaId: newDrama.id, // Menghubungkan penghargaan dengan drama yang baru dibuat
        },
      });
    }

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
        country: true, // Menyertakan country
        awards: true, // Menyertakan awards
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
      where: {
        id: parseInt(id), // Pastikan ID diubah menjadi integer
      },
      include: {
        genres: { include: { genre: true } },
        actors: { include: { actor: true } },
        reviews: true,
        awards: true,
        country: true,
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
    if (
      !reviewData.userId ||
      !reviewData.dramaId ||
      !reviewData.author ||
      !reviewData.content
    ) {
      throw new Error("Incomplete data provided for review.");
    }

    const newReview = await prisma.review.create({
      data: {
        author: reviewData.author,
        content: reviewData.content,
        rating: parseFloat(reviewData.rating),
        dramaId: parseInt(reviewData.dramaId),
        userId: parseInt(reviewData.userId),
      },
    });

    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
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

const searchDramas = async (query) => {
  try {
    const { name, genre, year, rating, country } = query;

    const filters = {};

    // Filter by name if provided
    if (name) {
      filters.title = {
        contains: name,
        mode: "insensitive",
      };
    }

    // Filter by genre if provided
    if (genre) {
      const genreData = await prisma.genre.findUnique({
        where: { name: genre },
      });

      if (genreData) {
        filters.genres = {
          some: {
            genreId: genreData.id,
          },
        };
      }
    }

    // Filter by year if provided
    if (year) {
      filters.year = parseInt(year);
    }

    // Filter by rating if provided
    if (rating) {
      filters.rating = {
        gte: parseFloat(rating),
      };
    }

    // Filter by country name if provided
    if (country) {
      const countryData = await prisma.country.findUnique({
        where: { name: country },
      });

      if (countryData) {
        filters.countryId = countryData.id;
      } else {
        // Jika negara tidak ditemukan, kembalikan array kosong
        return [];
      }
    }

    // Fetch dramas with applied filters
    const dramas = await prisma.drama.findMany({
      where: filters,
      include: {
        genres: { include: { genre: true } },
        actors: { include: { actor: true } },
        country: true,
        reviews: true,
        awards: true,
      },
    });

    return dramas;
  } catch (error) {
    console.error("Error searching dramas:", error);
    throw error;
  }
};

// Fungsi untuk update data drama
const updateDrama = async (req, res) => {
  try {
    const dramaId = parseInt(req.params.id, 10); // pastikan dramaId sebagai integer
    const dramaData = req.body; // data yang diambil dari request body

    // Hapus asosiasi lama dengan actors, genres
    await prisma.actorToDrama.deleteMany({ where: { dramaId } });
    await prisma.dramaToGenres.deleteMany({ where: { dramaId } });

    // Update drama di database dengan data yang diterima
    const updatedDrama = await prisma.drama.update({
      where: {
        id: dramaId
      },
      data: {
        title: dramaData.title,
        alternativeTitle: dramaData.alternativeTitle,
        year: dramaData.year,
        countryId: dramaData.countryId,
        synopsis: dramaData.synopsis,
        linkTrailer: dramaData.linkTrailer,
        posterUrl: dramaData.posterUrl,
        rating: dramaData.rating,
        duration: parseInt(dramaData.duration, 10), // pastikan duration sebagai integer
        
        // Pengecekan sebelum melakukan mapping
        genres: {
          create: dramaData.genres ? dramaData.genres.map((genreId) => ({
            genre: {
              connect: { id: genreId }
            }
          })) : [] // jika undefined, maka tidak ada yang ditambahkan
        },
        
        actors: {
          create: dramaData.actors ? dramaData.actors.map((actorId) => ({
            actor: {
              connect: { id: actorId }
            }
          })) : [] // jika undefined, maka tidak ada yang ditambahkan
        },
        
        awards: {
          connectOrCreate: dramaData.awards ? dramaData.awards.map((awardName) => ({
            where: { name: awardName },
            create: { name: awardName }
          })) : [] // jika undefined, maka tidak ada yang ditambahkan
        }
      }
    });

    res.json(updatedDrama);
  } catch (error) {
    console.error('Error updating drama:', error);
    res.status(500).json({ error: 'Error updating drama', details: error.message });
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
  deleteCountry,
  searchDramas,
  updateDrama,
};
