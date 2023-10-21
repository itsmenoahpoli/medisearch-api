export const slugify = (str: string): string => {
  return str.replaceAll(" ", "-").toLowerCase();
};
