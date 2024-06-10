export const userToken = localStorage.getItem('biztoken');

const getTizaraAdminToken = () => {
  const token = localStorage.getItem('biztoken');
  return token;
};

export default getTizaraAdminToken;
