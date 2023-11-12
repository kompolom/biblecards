import type { Config } from 'jest';

const config: Config = {
    rootDir: 'src',
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
        '^shared/(.*)$': '<rootDir>/shared/$1',
        '^entities/(.*)$': '<rootDir>/entities/$1',
    },
    transform: {
        '^.+\\.tsx?$': "ts-jest"
    },
}

export default config;