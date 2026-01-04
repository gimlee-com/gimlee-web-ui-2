import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { apiClient } from '../services/apiClient';
import { userService } from '../profile/services/userService';
import i18n from '../i18n';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!apiClient.getToken());

  useEffect(() => {
    if (isAuthenticated) {
      userService.getUserPreferences()
        .then(prefs => {
          if (prefs.language) {
            i18n.changeLanguage(prefs.language);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const login = (token: string) => {
    apiClient.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    apiClient.setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
