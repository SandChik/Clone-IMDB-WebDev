const { PrismaClient } = require("@prisma/client");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../Backend/Server/server");

const prisma = new PrismaClient();

describe("Auth API Testing - Real API", () => {
  beforeEach(async () => {
    // Hapus semua pengguna sebelum setiap pengujian
    await prisma.users.deleteMany();

    // Tambahkan pengguna default untuk pengujian login
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.users.create({
      data: {
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
        role: "USER",
      },
    });
  });


  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("should register a new user", async () => {
    const newUser = {
      username: "newuser",
      email: "newuser@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(response.status).toBe(201); // Registrasi berhasil
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.username).toBe(newUser.username);
    expect(response.body.user.email).toBe(newUser.email);
  });

  test("should login with valid credentials", async () => {
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(200); // Login berhasil
    expect(response.body).toHaveProperty("token");
  });

  test("should fail login with invalid credentials", async () => {
    const loginData = {
      email: "wrong@example.com",
      password: "wrongpassword",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });

  test("should access protected route with valid token", async () => {
    // Login untuk mendapatkan token
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    const userToken = loginResponse.body.token;

    // Akses rute yang dilindungi
    const response = await request(app)
      .get("/api/protected-route") // Pastikan rute ini ada di server.js
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200); // OK
    expect(response.body).toHaveProperty("message", "Access granted");
  });

  test("should fail to access protected route without token", async () => {
    const response = await request(app).get("/api/protected-route");

    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty("message", "No token provided");
  });

  test("should fail to access protected route with invalid token", async () => {
    const response = await request(app)
      .get("/api/protected-route")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});
