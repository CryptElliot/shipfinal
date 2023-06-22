const nextJest = require('next/jest')
const ignoredModules = ['next'].join('|')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  setupFiles: [
    '<rootDir>/.jest/setEnvVars.js',
  ],
  moduleNameMapper: {
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/blog-data/(.*)$': '<rootDir>/src/blog-data/$1',
  },
  testPathIgnorePatterns: [
    "<rootDir>/e2e/",
    '/node_modules/',
    '/.next/',
  ],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'
  },
  transformIgnorePatterns: [`/node_modules/(?!${ignoredModules})`]
}

module.exports = createJestConfig(customJestConfig)
