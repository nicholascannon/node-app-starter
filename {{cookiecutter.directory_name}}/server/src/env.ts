import { getNumber, getStringList } from './utils/environment-parser';

export interface Environment {
  port: number;
  corsOrigins: string[];
}

export const getEnvironment = (): Environment => {
  return {
    port: getNumber('PORT'),
    corsOrigins: getStringList('ALLOWED_ORIGINS', false),
  };
};
