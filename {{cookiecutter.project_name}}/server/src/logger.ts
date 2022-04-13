import * as winston from 'winston';

export type Logger = winston.Logger;

export const createWinstonLogger = (level: string): Logger =>
    winston.createLogger({ level, transports: [new winston.transports.Console()] });
