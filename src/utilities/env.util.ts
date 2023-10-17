export const getEnv = <T>(key: T): T => {
  return process.env[`APP_${key}`] as T;
};
