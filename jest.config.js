module.exports = {
    setupFiles: ['<rootDir>/jest.setup.js'],
    preset: 'react-native',
    // setupFilesAfterEnv: ['@testing-library/react-native/cleanup-after-each'],
    testMatch: ['**/TaseCases/**/*.test.js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!react-native|@react-native|@unimodules)'],
  };
  