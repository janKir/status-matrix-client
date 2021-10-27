module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: [`<rootDir>/jest.setup.ts`],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    // "<rootDir>/.cache/",
    "<rootDir>/dist/",
  ],
};
