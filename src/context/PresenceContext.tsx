import React, { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { presenceService } from '../profile/services/presenceService';
import { useAuth } from './AuthContext';
import type { PresenceStatus, UserPresenceDto } from '../types/api';

interface PresenceContextType {
  presence: UserPresenceDto | null;
  updatePresence: (status: PresenceStatus, customStatus?: string) => Promise<void>;
  refreshPresence: () => Promise<void>;
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

const PING_INTERVAL = 60000; // 1 minute

export const PresenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [presence, setPresence] = useState<UserPresenceDto | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMyPresence = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const data = await presenceService.getMyPresence();
      setPresence(data);
    } catch (error) {
      console.error('Failed to fetch my presence', error);
    }
  }, [isAuthenticated]);

  const ping = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      await presenceService.ping();
    } catch (error) {
      console.error('Failed to ping presence', error);
    }
  }, [isAuthenticated]);

  const updatePresence = useCallback(async (status: PresenceStatus, customStatus?: string) => {
    if (!isAuthenticated) return;
    try {
      await presenceService.updateMyPresence({ status, customStatus });
      await fetchMyPresence();
    } catch (error) {
      console.error('Failed to update presence', error);
      throw error;
    }
  }, [isAuthenticated, fetchMyPresence]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      fetchMyPresence();
      
      intervalRef.current = setInterval(() => {
        // Only ping if the user is not away (as per instructions: "user is not away, but doesn't interact")
        // We check the latest presence status
        setPresence(currentPresence => {
          if (currentPresence?.status !== 'AWAY') {
            ping();
          }
          return currentPresence;
        });
      }, PING_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setPresence(null);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, loading, ping, fetchMyPresence]);

  return (
    <PresenceContext.Provider value={{
      presence,
      updatePresence,
      refreshPresence: fetchMyPresence,
    }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = () => {
  const context = useContext(PresenceContext);
  if (context === undefined) {
    throw new Error('usePresence must be used within a PresenceProvider');
  }
  return context;
};
