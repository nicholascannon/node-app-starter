import { getNumber } from './utils/environment-parser';

export interface Environment {
  port: Number;
}

export const getEnvironment = (): Environment => {
  return {
    port: getNumber('PORT'),
  };
};
