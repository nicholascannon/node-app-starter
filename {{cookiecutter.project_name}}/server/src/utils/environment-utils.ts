export const isSecret = (key: string): boolean => !!key.match(/(password|secret|key|token)/gi)?.length;

export const redactSecrets = (environment: Record<string, unknown>): Record<string, unknown> =>
  Object.entries(environment).reduce((redactedEnv, [key, value]) => {
    let safeValue = value;
    if (typeof value === 'object') safeValue = redactSecrets({ ...value });
    if (isSecret(key)) safeValue = '****';
    return { ...redactedEnv, [key]: safeValue };
  }, {});
