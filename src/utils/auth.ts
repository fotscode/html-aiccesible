
export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('token'); 
};
