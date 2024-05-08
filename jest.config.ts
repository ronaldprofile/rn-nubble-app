import { Config } from 'jest'

const config: Config = {
  preset: 'react-native',
  collectCoverageFrom: [
    'src/{components,utils,hooks,domain,screens}/**/*.{js,jsx,ts,tsx}'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'index'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: ['node_modules', './src/test'],
  setupFiles: ['<rootDir>/src/test/jestSetup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context)|@react-navigation/)'
  ]
}

export default config
