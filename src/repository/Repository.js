export const getObjectBy = (id, data) => {
  return data?.find((a) => a.id === id);
};
