import { useState, useEffect, useCallback, useRef } from 'react';
import type { VolatilityStatusDto } from '../../types/api';
import { volatilityService } from '../services/volatilityService';

const POLL_INTERVAL = 45_000; // 45 seconds

interface UseVolatilityStatusOptions {
  enabled?: boolean;
}

export const useVolatilityStatus = ({ enabled = true }: UseVolatilityStatusOptions = {}) => {
  const [statuses, setStatuses] = useState<VolatilityStatusDto[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await volatilityService.getStatus();
      setStatuses(data);
    } catch {
      // Silently fail — banner simply won't show
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setStatuses([]);
      setLoading(false);
      return;
    }

    fetchStatus();

    const startPolling = () => {
      intervalRef.current = setInterval(fetchStatus, POLL_INTERVAL);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        fetchStatus();
        startPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchStatus, enabled]);

  const volatileCurrencies = statuses.filter(s => s.isVolatile);
  const staleCurrencies = statuses.filter(s => s.isStale);
  const cooldownCurrencies = statuses.filter(
    s => !s.isVolatile && !s.isStale && s.cooldownEndsAt && new Date(s.cooldownEndsAt) > new Date()
  );
  const hasIssues = volatileCurrencies.length > 0 || staleCurrencies.length > 0 || cooldownCurrencies.length > 0;

  return {
    statuses,
    volatileCurrencies,
    staleCurrencies,
    cooldownCurrencies,
    hasIssues,
    loading,
    refetch: fetchStatus,
  };
};
