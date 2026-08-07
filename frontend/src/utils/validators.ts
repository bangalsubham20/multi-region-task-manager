export const isValidTitle = (title: string): boolean => {
  return title.trim().length >= 3 && title.trim().length <= 100;
};

export const isValidDate = (dateString?: string): boolean => {
  if (!dateString) return true;
  const timestamp = Date.parse(dateString);
  return !isNaN(timestamp);
};
