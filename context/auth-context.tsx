"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/axios';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, userData?: any) => void;
  logout: () => void;
  user: any | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);

    // Здесь можно добавить запрос профиля пользователя, если есть токен
    if (authStatus) {
      // Пример: загрузка данных пользователя из localStorage
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
  }, []);

  const login = (token: string, userData?: any) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}; 