import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testPathIgnorePatterns: ['./dist'],
};
export default config;
