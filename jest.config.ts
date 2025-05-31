import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  collectCoverage: true,

  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  transform: {
    // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
    // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
    '^.+\\.tsx?$': ['ts-jest', {}]
  },

  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1',

    // Для алиаса на файл burger-api.ts
    '^@api$': '<rootDir>/src/utils/burger-api.ts',

    '^@slices(.*)$': '<rootDir>/src/services/slices$1',

    // Для алиаса на файл store.ts
    '^@store$': '<rootDir>/src/services/store.ts',

    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@selectors(.*)$': '<rootDir>/src/services/selectors$1',
    '^@utils-cookie(.*)$': '<rootDir>/src/utils/cookie$1'
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};

export default config;
