import React from 'react';
import { Avatar } from './Avatar/Avatar';
import { PresenceBadge } from '../profile/components/PresenceBadge';
import type { PresenceStatus } from '../types/api';

interface AvatarWithPresenceProps {
  username: string;
  avatarUrl?: string | null;
  size?: number;
  status?: PresenceStatus;
  customStatus?: string;
  badgeSize?: number;
}

export const AvatarWithPresence: React.FC<AvatarWithPresenceProps> = React.memo(({
  username,
  avatarUrl,
  size = 40,
  status,
  customStatus,
  badgeSize = 12
}) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: size, height: size, flexShrink: 0 }}>
      <Avatar 
        username={username} 
        avatarUrl={avatarUrl} 
        size={size} 
      />
      {status && status !== 'OFFLINE' && (
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            transform: 'translate(20%, -20%)',
            zIndex: 1
          }}
        >
          <PresenceBadge 
            status={status} 
            customStatus={customStatus} 
            showText={false} 
            style={{
              backgroundColor: 'var(--global-background)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: `${badgeSize + 4}px`,
              height: `${badgeSize + 4}px`,
              flexShrink: 0
            }}
            circleStyle={{
              width: `${badgeSize}px`,
              height: `${badgeSize}px`,
              margin: 0
            }}
          />
        </div>
      )}
    </div>
  );
});
