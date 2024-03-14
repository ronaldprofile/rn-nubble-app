module.exports = {
  preset: 'react-native',
  collectCoverageFrom: [
    'src/{components,utils,hooks,domain}/**/*.{js,jsx,ts,tsx}'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules', './src/test'],
  setupFiles: ['<rootDir>/src/test/jestSetup.ts']
}
