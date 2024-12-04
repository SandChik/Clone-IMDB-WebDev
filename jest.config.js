module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Gunakan babel-jest untuk file JS/JSX
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "json", "node"], // Ekstensi file yang didukung
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
