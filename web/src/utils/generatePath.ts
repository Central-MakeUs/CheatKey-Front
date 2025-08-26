export const generatePath = <T extends Record<string, string | number>>(
  path: string,
  params: T,
) => {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`:${key}`, String(params[key as keyof T])),
    path,
  );
};
