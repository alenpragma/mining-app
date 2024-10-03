// export const formatToLocalDate = (date: string) => {
//   const localDate = new Date(date).toLocaleString();
//   return localDate;
// };

export const formatToLocalDate = (date: string) => {
  const localDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return localDate;
};
