import expressWinston from 'express-winston';
import winston from 'winston';

export const useWinstonRequestLogger = () =>
    expressWinston.logger({
        transports: [new winston.transports.Console()],
    });
