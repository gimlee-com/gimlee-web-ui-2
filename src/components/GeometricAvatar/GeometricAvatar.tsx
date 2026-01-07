import React, { useMemo } from 'react';
import { generateGeometricAvatar } from '../../utils/geometricon-utils';

interface AvatarProps {
    username: string;
    size?: number;
}

export const GeometricAvatar: React.FC<AvatarProps> = ({ username, size = 80 }) => {
    const svgString = useMemo(() => generateGeometricAvatar(username, size), [username, size]);

    return (
        <div
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svgString }}
        />
    );
};