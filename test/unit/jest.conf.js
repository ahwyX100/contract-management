const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  roots: [
    '<rootDir>/test/unit'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@nomisma/(.*)$': '<rootDir>/core/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    ".+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$": "<rootDir>/node_modules/jest-transform-stub"
  },
  testURL: 'http://localhost',
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage'
  // collectCoverageFrom: [
  //   'src/**/*.{js,vue}',
  //   '!src/main.js',
  //   '!src/router/index.js',
  //   '!**/node_modules/**'
  // ]
}
