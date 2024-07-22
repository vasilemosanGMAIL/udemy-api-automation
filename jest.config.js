/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@controller/(.*)$': '<rootDir>/controller/$1',
    '^@specs/(.*)$': '<rootDir>/specs/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
  },
};
