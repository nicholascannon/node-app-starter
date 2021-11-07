type GetEnvironmentValue<T> = (key: string, required?: boolean) => T;

export const getString: GetEnvironmentValue<string> = (key, required = true) => {
  const value = process.env[key];
  const isInvalid = value === null || value === undefined;

  if (required && isInvalid) throw new Error(`Environment error: ${key} is required, got ${value}`);

  return value || '';
};

export const getStringList: GetEnvironmentValue<string[]> = (key, required = true) => {
  const value = getString(key, required);
  return value.split(',');
};

export const getNumber: GetEnvironmentValue<number> = (key, required = true) => {
  const value = Number(getString(key, required));
  const isInvalid = !Number.isSafeInteger(value) || Number.isNaN(value);

  if (required && isInvalid) throw new Error(`Environment error: ${key} is not a valid number, got ${value}`);

  return value;
};

export const isSecret = (key: string): boolean => !!key.match(/(password|secret|key|token)/gi)?.length;

export const getRedactedEnvironment = (environment: Record<string, unknown>): Record<string, unknown> =>
  Object.entries(environment).reduce((redactedEnv, [key, value]) => {
    if (typeof value === 'object') value = getRedactedEnvironment({ ...value });
    if (isSecret(key)) value = '****';
    return { ...redactedEnv, [key]: value };
  }, {});
