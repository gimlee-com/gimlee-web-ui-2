import React from 'react';
import { GeometricAvatar } from '../GeometricAvatar/GeometricAvatar';
import { Image } from '../Image/Image';

interface AvatarProps {
  username: string;
  avatarUrl?: string | null;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = React.memo(({
  username,
  avatarUrl,
  size = 40,
  className,
  style
}) => {
  return (
    <div 
      className={`uk-border-circle uk-overflow-hidden ${className || ''}`} 
      style={{ 
        width: size, 
        height: size, 
        flexShrink: 0,
        ...style 
      }}
    >
      {avatarUrl ? (
        <Image src={avatarUrl} width={size.toString()} height={size.toString()} alt={username} />
      ) : (
        <GeometricAvatar username={username} size={size} />
      )}
    </div>
  );
});
