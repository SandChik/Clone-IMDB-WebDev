const { PrismaClient } = require("@prisma/client"); // Untuk mengakses database melalui Prisma
const request = require("supertest"); // Untuk melakukan request API
const jwt = require("jsonwebtoken"); // Untuk membuat token autentikasi
const app = require("../../Backend/Server/server"); // Mengimpor aplikasi server Anda
const prisma = new PrismaClient();


describe("Actor API Testing - Real API", () => {
  let adminToken;
  let createdActorId; // Variabel untuk menyimpan ID actor yang baru ditambahkan

  beforeAll(() => {
    adminToken = jwt.sign(
      { userId: 1, role: "ADMIN" },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );
  });

  afterEach(async () => {
    if (createdActorId) {
      const existingActor = await prisma.actor.findUnique({
        where: { id: createdActorId },
      });

      if (existingActor) {
        await prisma.actor.delete({
          where: { id: createdActorId },
        });
      }
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Test Create Actor
  test("should create a new actor", async () => {
    const newActor = {
      name: "John Doe",
      countryId: 1, // Pastikan ID ini valid di database Anda
      urlPhoto: "http://example.com/photo.jpg",
    };

    const response = await request(app)
      .post("/api/actors")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newActor);

    expect(response.status).toBe(201); // Status Created
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newActor.name);
    expect(response.body.urlPhoto).toBe(newActor.urlPhoto);

    // Simpan ID actor untuk keperluan penghapusan setelah pengujian
    createdActorId = response.body.id;
  });

  // Test Read All Actors
  test("should fetch all actors", async () => {
    const response = await request(app)
      .get("/api/actors")
      .set("Authorization", `Bearer ${adminToken}`); // Sertakan token

    expect(response.status).toBe(200); // OK
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Pastikan ada data
  });

  test("should update an actor", async () => {
    const newActor = {
      name: "John Doe",
      countryId: 1,
      urlPhoto: "http://example.com/photo.jpg",
    };

    const createResponse = await request(app)
      .post("/api/actors")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newActor);

    expect(createResponse.status).toBe(201);
    createdActorId = createResponse.body.id;

    const updatedActor = {
      name: "John Updated",
      countryId: 2, // Pastikan ID country valid
      urlPhoto: "http://example.com/photo_updated.jpg",
    };

    const updateResponse = await request(app)
      .put(`/api/actors/${createdActorId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedActor);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe(updatedActor.name);
    expect(updateResponse.body.urlPhoto).toBe(updatedActor.urlPhoto);
  });

  test("should delete an actor", async () => {
    const newActor = {
      name: "John Doe",
      countryId: 1,
      urlPhoto: "http://example.com/photo.jpg",
    };

    const createResponse = await request(app)
      .post("/api/actors")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newActor);

    expect(createResponse.status).toBe(201);
    createdActorId = createResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/actors/${createdActorId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(deleteResponse.status).toBe(204);

    const fetchResponse = await request(app).get(
      `/api/actors/${createdActorId}`
    );
    expect(fetchResponse.status).toBe(404); // Pastikan aktor sudah dihapus
  });
  
  test("should fetch a single actor by ID", async () => {
    // Buat aktor baru sebelum pengujian
    const newActor = {
      name: "John Fetch",
      countryId: 1, // Pastikan ID ini valid
      urlPhoto: "http://example.com/photo_fetch.jpg",
    };

    const createResponse = await request(app)
      .post("/api/actors")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newActor);

    expect(createResponse.status).toBe(201); // Pastikan aktor berhasil dibuat
    const createdActorId = createResponse.body.id;

    // Fetch aktor berdasarkan ID
    const fetchResponse = await request(app).get(
      `/api/actors/${createdActorId}`
    );

    // Pastikan respons memiliki data yang benar
    expect(fetchResponse.status).toBe(200); // OK
    expect(fetchResponse.body).toHaveProperty("id", createdActorId); // ID sesuai
    expect(fetchResponse.body.name).toBe(newActor.name); // Nama sesuai
  });

});
