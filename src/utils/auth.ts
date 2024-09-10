
export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('token'); 
};

export const getToken = (): string => {
  return sessionStorage.getItem('token')? sessionStorage.getItem('token') as string : ''; 
};

export const getUsername = (): string => {
  return sessionStorage.getItem('username')? sessionStorage.getItem('username') as string : ''; 
};
