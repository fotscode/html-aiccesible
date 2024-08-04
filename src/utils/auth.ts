
export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('token'); 
};

export const getToken = (): string => {
  return sessionStorage.getItem('token')? sessionStorage.getItem('token') as string : ''; 
};
