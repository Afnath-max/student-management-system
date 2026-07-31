export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const getEmail = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('email');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const loginSession = (token: string, email: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }
};

export const logoutSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }
};
