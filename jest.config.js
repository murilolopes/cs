module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "@core(.*)$": "<rootDir>/src/@core/$1",
    "@axios(.*)$": "<rootDir>/src/libs/axios",
    "@themeConfig(.*)$": "<rootDir>/themeConfig",
    "@validations(.*)$": "<rootDir>/src/@core/utils/validations/validations",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  "transformIgnorePatterns": ["/node_modules/(?!xlsexport|vee-validate).+\\.js$"],
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/(*.)unit.js", "**/tests/**/*.spec.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue2-jest"
  },
  globals: {
    'vue-jest': {
      templateCompiler: {
        compiler: require('vue-template-babel-compiler')
      }
    }
  }
}
