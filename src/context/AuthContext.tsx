import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { apiClient } from '../services/apiClient';
import { userService } from '../profile/services/userService';
import i18n from '../i18n';
import type { SessionInitResponseDto, UserProfileDto } from '../types/api';
import { decodeJwt } from '../auth/utils/jwt';

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfileDto | null;
  username: string | null;
  roles: string[];
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileDto | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshSession = useCallback(async () => {
    try {
      const session = await apiClient.get<SessionInitResponseDto>('/session/init?decorators=accessToken,userProfile');
      if (session.accessToken) {
        apiClient.setToken(session.accessToken);
        const decoded = decodeJwt(session.accessToken);
        setUsername(decoded?.username || null);
        setRoles(decoded?.roles || []);
        setIsAuthenticated(true);
      } else {
        apiClient.setToken(null);
        setUsername(null);
        setRoles([]);
        setIsAuthenticated(false);
      }
      setUserProfile(session.userProfile);
    } catch (error) {
      console.error('Failed to initialize session', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

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

  const login = async (token: string) => {
    apiClient.setToken(token);
    await refreshSession();
  };

  const logout = () => {
    apiClient.setToken(null);
    setIsAuthenticated(false);
    setUserProfile(null);
    setUsername(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userProfile,
      username,
      roles,
      login,
      logout,
      loading,
      refreshSession
    }}>
      {!loading && children}
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
