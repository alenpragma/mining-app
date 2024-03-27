export const formatToLocalDate = (date: string) => {
  const localDate = new Date(date).toLocaleString();
  console.log(localDate);
  return localDate;
};
