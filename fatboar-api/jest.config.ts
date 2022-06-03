const jestConfig = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  verbose: true,
  testMatch: ["<rootDir>/**/*spec.ts"],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/test/setup-tests.ts"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  collectCoverage: true,
  coverageDirectory: "target/coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  moduleNameMapper: {
    "^.+\\.(css)$": "identity-obj-proxy",
    "^.+\\.(png|svg|pdf|jpg|jpeg)$": "jest-transform-stub",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
};

export default jestConfig;
