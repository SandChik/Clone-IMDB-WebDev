const { PrismaClient } = require("@prisma/client");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../Backend/Server/server");
const prisma = new PrismaClient();

describe("Drama API Testing - Real API", () => {
  let adminToken;
  let createdDramaId; // Variabel untuk menyimpan ID drama yang baru ditambahkan

  beforeAll(() => {
    adminToken = jwt.sign(
      { userId: 1, role: "ADMIN" },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );
  });

  afterEach(async () => {
    if (createdDramaId) {
      const existingDrama = await prisma.drama.findUnique({
        where: { id: createdDramaId },
      });

      if (existingDrama) {
        await prisma.drama.delete({
          where: { id: createdDramaId },
        });
      }
    }
  });


  afterAll(async () => {
    await prisma.$disconnect();
  });

   test("should fetch all dramas", async () => {
     const response = await request(app).get("/api/dramas");

     expect(response.status).toBe(200); // OK
     expect(Array.isArray(response.body)).toBe(true);
     expect(response.body.length).toBeGreaterThan(0); // Pastikan ada data
   });

  test("should create a new drama", async () => {
    const newDrama = {
      title: "Test Drama",
      alternativeTitle: "Drama Alt A",
      year: 2023,
      country: "South Korea",
      synopsis: "This is a test drama.",
      availability: "Available",
      linkTrailer: "http://example.com/trailer.mp4",
      posterUrl: "http://example.com/poster.jpg",
      rating: 4.5,
      duration: 120,
      genres: [1, 2], // ID genre valid
      actors: [1, 2], // ID aktor valid
    };

    const response = await request(app)
      .post("/api/dramas")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newDrama);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    // Simpan ID drama yang baru dibuat
    createdDramaId = response.body.id;

    expect(response.body.title).toBe(newDrama.title);
    expect(response.body.synopsis).toBe(newDrama.synopsis);
  });

  test("should fetch a single drama by ID", async () => {
    // Buat drama baru sebelum pengujian
    const createResponse = await request(app)
      .post("/api/dramas")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Drama",
        alternativeTitle: "Drama Alt Test",
        year: 2023,
        country: "South Korea",
        synopsis: "This is a test drama",
        availability: "Available",
        linkTrailer: "http://example.com/trailer.mp4",
        posterUrl: "http://example.com/poster.jpg",
        rating: 4.5,
        duration: 120,
        genres: [1, 2], // ID genre valid
        actors: [1, 2], // ID aktor valid
      });

    expect(createResponse.status).toBe(201); // Pastikan drama berhasil dibuat
    const createdDramaId = createResponse.body.id;

    // Fetch drama berdasarkan ID
    const fetchResponse = await request(app).get(
      `/api/dramas/${createdDramaId}`
    );

    // Pastikan respons memiliki data yang benar
    expect(fetchResponse.status).toBe(200); // OK
    expect(fetchResponse.body).toHaveProperty("id", createdDramaId); // ID sesuai
    expect(fetchResponse.body).toHaveProperty("title", "Test Drama"); // Drama memiliki title
    expect(fetchResponse.body).toHaveProperty(
      "synopsis",
      "This is a test drama"
    ); // Drama memiliki synopsis
  });

  test("should delete the newly created drama", async () => {
    // Tambahkan drama terlebih dahulu
    const newDrama = {
      title: "Test Drama",
      alternativeTitle: "Drama Alt A",
      year: 2023,
      country: "South Korea",
      synopsis: "This is a test drama.",
      availability: "Available",
      linkTrailer: "http://example.com/trailer.mp4",
      posterUrl: "http://example.com/poster.jpg",
      rating: 4.5,
      duration: 120,
      genres: [1, 2],
      actors: [1, 2],
    };

    const createResponse = await request(app)
      .post("/api/dramas")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newDrama);

    expect(createResponse.status).toBe(201);

    // Simpan ID drama yang baru dibuat
    createdDramaId = createResponse.body.id;

    // Hapus drama berdasarkan ID yang baru dibuat
    const deleteResponse = await request(app)
      .delete(`/api/dramas/${createdDramaId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200, 204]).toContain(deleteResponse.status); // Terima status 200 atau 204

    // Verifikasi bahwa drama telah dihapus
    const fetchResponse = await request(app).get(
      `/api/dramas/${createdDramaId}`
    );
    expect(fetchResponse.status).toBe(404); // Drama tidak ditemukan
  });

    test("should update an existing drama", async () => {
      // Buat drama baru sebelum pengujian
      const createResponse = await request(app)
        .post("/api/dramas")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          title: "Drama to Update",
          alternativeTitle: "Drama Alt Update",
          year: 2023,
          country: "South Korea",
          synopsis: "Original synopsis",
          availability: "Available",
          linkTrailer: "http://example.com/trailer.mp4",
          posterUrl: "http://example.com/poster.jpg",
          rating: 4.0,
          duration: 100,
          genres: [1], // ID genre valid
          actors: [1], // ID aktor valid
        });

      expect(createResponse.status).toBe(201); // Drama berhasil dibuat
      const createdDramaId = createResponse.body.id;

      // Update drama berdasarkan ID
      const updatedData = {
        title: "Updated Drama Title",
        synopsis: "Updated synopsis for the drama",
        rating: 4.8,
      };

      const updateResponse = await request(app)
        .put(`/api/dramas/${createdDramaId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedData);

      expect(updateResponse.status).toBe(200); // Pastikan update berhasil
      expect(updateResponse.body).toHaveProperty("id", createdDramaId); // ID tetap sama
      expect(updateResponse.body).toHaveProperty("title", updatedData.title); // Judul diperbarui
      expect(updateResponse.body).toHaveProperty(
        "synopsis",
        updatedData.synopsis
      ); // Synopsis diperbarui
      expect(updateResponse.body).toHaveProperty("rating", updatedData.rating); // Rating diperbarui

      // Verifikasi perubahan
      const fetchResponse = await request(app).get(
        `/api/dramas/${createdDramaId}`
      );
      expect(fetchResponse.status).toBe(200); // Drama ditemukan
      expect(fetchResponse.body).toHaveProperty("title", updatedData.title); // Judul diperbarui
      expect(fetchResponse.body).toHaveProperty(
        "synopsis",
        updatedData.synopsis
      ); // Synopsis diperbarui
      expect(fetchResponse.body).toHaveProperty("rating", updatedData.rating); // Rating diperbarui
    });
  
});
