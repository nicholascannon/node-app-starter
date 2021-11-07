import Logger, { createLogger, stdSerializers } from 'bunyan';

let logger: Logger | undefined;

export const getLogger = (): Logger => {
  if (!logger) logger = createLogger({ name: '{{cookiecutter.project_name}}', serializers: stdSerializers });
  return logger;
};
