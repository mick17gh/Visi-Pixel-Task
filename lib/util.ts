export const generateSlug = (name: string) => {
  return name.replace(/\s+/g, '-').toLowerCase();
};
