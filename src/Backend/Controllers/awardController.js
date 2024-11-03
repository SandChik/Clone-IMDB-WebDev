const prisma = require("../prismaClient"); // Pastikan prismaClient di sini mengarah ke Prisma instance Anda

const getAllAwards = async (req, res) => {
  try {
    const awards = await prisma.award.findMany({
      include: {
        awardToCountries: {
          include: {
            country: true,
          },
        },
        drama: true,
      },
    });

    const formattedAwards = awards.map((award) => ({
      id: award.id,
      name: award.name,
      countries: award.awardToCountries
        .map((atc) => atc.country)
        .filter((country) => country != null), // Filter jika country tidak ada
      drama: award.drama ? award.drama.title : null,
    }));

    res.json(formattedAwards);
  } catch (error) {
    console.error("Error fetching awards:", error);
    res.status(500).json({ error: "Failed to fetch awards" });
  }
};

const createAward = async (req, res) => {
  const { name, countryId } = req.body; // Ambil countryId dari body
  try {
    // Buat award baru
    const newAward = await prisma.award.create({
      data: {
        name: name,
      },
    });

    // Pastikan countryId adalah tipe Int
    const parsedCountryId = parseInt(countryId, 10);

    // Hubungkan award baru dengan country melalui AwardToCountry
    if (parsedCountryId) {
      await prisma.awardToCountry.create({
        data: {
          awardId: newAward.id,
          countryId: parsedCountryId, // Gunakan parsedCountryId sebagai Int
        },
      });
    }

    res.status(201).json(newAward);
  } catch (error) {
    console.error("Error creating award:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the award." });
  }
};

// awardController.js
const updateAward = async (req, res) => {
    const { id } = req.params;  // Pastikan ID diambil dari params
    const { name, countryId } = req.body;  // Pastikan `name` dan `countryId` diambil dari body

    try {
        const updatedAward = await prisma.award.update({
            where: { id: parseInt(id) },
            data: {
                name: name,
                awardToCountries: {
                    deleteMany: {}, // Menghapus relasi lama
                    create: { countryId: parseInt(countryId) } // Menambahkan relasi baru
                }
            }
        });
        res.json(updatedAward);
    } catch (error) {
        console.error("Error updating award:", error);
        res.status(500).json({ message: "Failed to update award", error });
    }
};

// Hapus award berdasarkan ID
const deleteAward = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.award.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting award:", error);
    res.status(500).json({ error: "Failed to delete award" });
  }
};

module.exports = {
  getAllAwards,
  createAward,
  updateAward,
  deleteAward,
};
