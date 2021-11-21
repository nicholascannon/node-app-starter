import { getNumber, getString, getStringList } from './utils/environment-parser';

export interface Environment {
  version: string;
  port: number;
  corsOrigins: string[];
}

export const getEnvironment = (): Environment => {
  return {
    version: getString('VERSION'),
    port: getNumber('PORT'),
    corsOrigins: getStringList('ALLOWED_ORIGINS', false),
  };
};
