export const sliceHash = (address: any) => {
  const firstSix = address?.slice(0, 6);
  const lastSix = address.slice(-6);
  const result = `${firstSix}...${lastSix}`;
  return result;
};
