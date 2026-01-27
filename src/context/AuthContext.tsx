import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode, useRef } from 'react';
import { apiClient } from '../services/apiClient';
import { userService } from '../profile/services/userService';
import i18n from '../i18n';
import type { SessionInitResponseDto, UserProfileDto } from '../types/api';
import { decodeJwt } from '../auth/utils/jwt';

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfileDto | null;
  preferredCurrency: string | null;
  setPreferredCurrency: (currency: string | null) => void;
  username: string | null;
  roles: string[];
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthState {
  isAuthenticated: boolean;
  userProfile: UserProfileDto | null;
  preferredCurrency: string | null;
  username: string | null;
  roles: string[];
  loading: boolean;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    userProfile: null,
    preferredCurrency: null,
    username: null,
    roles: [],
    loading: true,
  });

  const initStarted = useRef(false);

  const refreshSession = useCallback(async () => {
    if (initStarted.current) return;
    initStarted.current = true;

    try {
      const session = await apiClient.get<SessionInitResponseDto>('/session/init?decorators=accessToken,userProfile,preferredCurrency');
      
      let username: string | null = null;
      let roles: string[] = [];
      let isAuthenticated = false;
      let preferredCurrency = session.preferredCurrency || null;

      if (session.accessToken) {
        apiClient.setToken(session.accessToken);
        const decoded = decodeJwt(session.accessToken);
        username = decoded?.username || null;
        roles = decoded?.roles || [];
        isAuthenticated = true;

        // Unified Initialization: fetch preferences before completing loading
        try {
          const prefs = await userService.getUserPreferences();
          if (prefs.preferredCurrency) {
            preferredCurrency = prefs.preferredCurrency;
          }
          if (prefs.language && prefs.language !== i18n.language) {
            await i18n.changeLanguage(prefs.language);
          }
        } catch (e) {
          console.error('Failed to fetch user preferences during init', e);
        }
      } else {
        apiClient.setToken(null);
      }

      setState({
        isAuthenticated,
        userProfile: session.userProfile,
        preferredCurrency,
        username,
        roles,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to initialize session', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (token: string) => {
    apiClient.setToken(token);
    initStarted.current = false; // Allow re-initialization after login
    await refreshSession();
  };

  const logout = () => {
    apiClient.setToken(null);
    setState({
      isAuthenticated: false,
      userProfile: null,
      preferredCurrency: null,
      username: null,
      roles: [],
      loading: false,
    });
  };

  const setPreferredCurrency = (currency: string | null) => {
    setState(prev => ({ ...prev, preferredCurrency: currency }));
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      setPreferredCurrency,
      login,
      logout,
      refreshSession
    }}>
      {!state.loading && children}
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
