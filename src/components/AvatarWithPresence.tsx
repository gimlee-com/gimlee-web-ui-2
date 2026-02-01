import React from 'react';
import { GeometricAvatar } from './GeometricAvatar/GeometricAvatar';
import { PresenceBadge } from '../profile/components/PresenceBadge';
import { Image } from './Image/Image';
import type { PresenceStatus } from '../types/api';

interface AvatarWithPresenceProps {
  username: string;
  avatarUrl?: string | null;
  size?: number;
  status?: PresenceStatus;
  customStatus?: string;
  badgeSize?: number;
}

export const AvatarWithPresence: React.FC<AvatarWithPresenceProps> = ({
  username,
  avatarUrl,
  size = 40,
  status,
  customStatus,
  badgeSize = 12
}) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: size, height: size, flexShrink: 0 }}>
      <div className="uk-border-circle uk-overflow-hidden" style={{ width: size, height: size }}>
        {avatarUrl ? (
          <Image src={avatarUrl} width={size.toString()} height={size.toString()} alt={username} />
        ) : (
          <GeometricAvatar username={username} size={size} />
        )}
      </div>
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
              backgroundColor: '#fff',
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
};
