module.exports = {
  // No typescript files in use in the project yet. Starting a migration to TS, but ran into some issues.

  // preset: 'ts-jest/presets/js-with-babel',

  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testURL: 'http://localhost',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$',
  testMatch: null,

  verbose: true,
};
