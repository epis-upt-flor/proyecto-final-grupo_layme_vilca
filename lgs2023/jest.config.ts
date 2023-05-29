import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
import  {compilerOptions} from './tsconfig.json'
import nextJest from 'next/jest'
const createJestConfig = nextJest({
  dir: "./",
})

const config: JestConfigWithTsJest = {
  verbose : true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  transformIgnorePatterns: ['node_modules/'],
  roots: ['./__test__'],
  modulePaths: ["."], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: compilerOptions.baseUrl } */),
  // moduleNameMapper: { '^@/(.*)$': './src/$1', },
}

export default createJestConfig(config);

