import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest } from '../api/client';

const AuthContext = createContext(null);

const STORAGE_KEY = 'allin1-auth';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { token: '', user: null };
  });

  const setSession = (data) => {
    setAuth(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const clearSession = () => {
    setAuth({ token: '', user: null });
    localStorage.removeItem(STORAGE_KEY);
  };

  const signup = async (payload) => {
    const data = await apiRequest('/auth/signup', { method: 'POST', body: payload });
    setSession({ token: data.token, user: data.user });
  };

  const login = async (payload) => {
    const data = await apiRequest('/auth/login', { method: 'POST', body: payload });
    setSession({ token: data.token, user: data.user });
  };

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      signup,
      login,
      logout: clearSession,
    }),
    [auth.token, auth.user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
