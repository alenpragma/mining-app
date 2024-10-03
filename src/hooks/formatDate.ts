// export const formatToLocalDate = (date: string) => {
//   const localDate = new Date(date).toLocaleString();
//   return localDate;
// };

export const formatToLocalDate = (date: string) => {
  const localDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  });
  return localDate;
};
