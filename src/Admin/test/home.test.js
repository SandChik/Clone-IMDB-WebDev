import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
import Home from "../../Client/pages/home/home"; // Pastikan path benar
import request from "supertest";
import app from "../../Backend/Server/server"; // Path ke server.js

// Mock Prisma Client
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    drama: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "Drama A",
          year: 2023,
          synopsis: "This is Drama A",
          posterUrl: "http://example.com/posterA.jpg",
        },
        {
          id: 2,
          title: "Drama B",
          year: 2022,
          synopsis: "This is Drama B",
          posterUrl: "http://example.com/posterB.jpg",
        },
      ]),
    },
  })),
}));

const mockDramas = [
  {
    id: 1,
    title: "Drama A",
    year: 2023,
    synopsis: "This is Drama A",
    posterUrl: "http://example.com/posterA.jpg",
  },
  {
    id: 2,
    title: "Drama B",
    year: 2022,
    synopsis: "This is Drama B",
    posterUrl: "http://example.com/posterB.jpg",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockDramas),
  })
);

describe("Home Component Rendering Test", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Bersihkan mock setelah setiap pengujian
  });

  test("should render Home component and display dramas", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Debug DOM untuk memastikan elemen dirender
    screen.debug();

    // Ambil semua elemen dengan teks "Drama A"
    const titleElementsA = await screen.findAllByText((content, element) => {
      return (
        element &&
        element.className.includes("posterImage__title") &&
        content.includes("Drama A")
      );
    });

    // Ambil semua elemen dengan teks "Drama B"
    const titleElementsB = await screen.findAllByText((content, element) => {
      return (
        element &&
        element.className.includes("posterImage__title") &&
        content.includes("Drama B")
      );
    });

    // Pastikan setidaknya satu elemen ditemukan untuk setiap judul
    expect(titleElementsA.length).toBeGreaterThan(0);
    expect(titleElementsB.length).toBeGreaterThan(0);

    // Periksa poster
    const posters = screen
      .getAllByRole("img")
      .filter((img) => ["Drama A", "Drama B"].includes(img.alt));
    expect(posters).toHaveLength(4); // Hanya ada 2 poster unik
    expect(posters[0]).toHaveAttribute("src", "http://example.com/posterA.jpg");
    expect(posters[1]).toHaveAttribute("src", "http://example.com/posterB.jpg");

    console.log(document.querySelectorAll(".posterImage__title"));
    console.log("Data drama yang digunakan dalam tes:", mockDramas);
  });

  test("should fetch dramas data from API", async () => {
    const response = await request(app).get("/api/dramas");
    expect(response.status).toBe(200); // Pastikan API mengembalikan status 200
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const drama = response.body[0];
    expect(drama).toHaveProperty("id");
    expect(drama).toHaveProperty("title");
    expect(drama).toHaveProperty("year");
    expect(drama).toHaveProperty("synopsis");
    expect(drama).toHaveProperty("posterUrl");
  });
});
