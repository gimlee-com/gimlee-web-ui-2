import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PresenceStatus } from '../../types/api';
import styles from './PresenceBadge.module.scss';

interface PresenceBadgeProps {
  status?: PresenceStatus;
  customStatus?: string;
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
  circleClassName?: string;
  circleStyle?: React.CSSProperties;
}

export const PresenceBadge: React.FC<PresenceBadgeProps> = ({ 
  status = 'OFFLINE', 
  customStatus, 
  showText = true,
  className = '',
  style,
  circleClassName = '',
  circleStyle
}) => {
  const { t } = useTranslation();

  const getStatusClass = (status: PresenceStatus) => {
    switch (status) {
      case 'ONLINE': return styles.statusOnline;
      case 'AWAY': return styles.statusAway;
      case 'BUSY': return styles.statusBusy;
      default: return styles.statusOffline;
    }
  };

  const getStatusText = (status: PresenceStatus) => {
    switch (status) {
      case 'ONLINE': return t('presence.online');
      case 'AWAY': return t('presence.away');
      case 'BUSY': return t('presence.busy');
      default: return t('presence.offline');
    }
  };

  return (
    <div 
      className={`${styles.presenceBadge} ${className}`} 
      title={customStatus || getStatusText(status)}
      style={style}
    >
      <span 
        className={`${styles.circle} ${getStatusClass(status)} ${circleClassName}`} 
        style={{ 
          marginRight: showText ? '8px' : '0',
          ...circleStyle
        }}
      />
      {showText && (
        <span className={styles.statusText}>
          {customStatus || getStatusText(status)}
        </span>
      )}
    </div>
  );
};
