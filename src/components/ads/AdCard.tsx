import React from 'react';
import { Link } from 'react-router-dom';
import type { AdPreviewDto } from '../../types/api';
import { Card, CardMedia, CardBody, CardTitle } from '../uikit/Card/Card';

interface AdCardProps {
  ad: AdPreviewDto;
}

const API_URL = import.meta.env.VITE_API_URL || '';

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const photoUrl = ad.mainPhotoPath ? `${API_URL}/api/media?p=${ad.mainPhotoPath}` : 'https://via.placeholder.com/300x200?text=No+Photo';

  return (
    <Card variant="hover" className="uk-height-1-1">
      <CardMedia position="top">
        <img src={photoUrl} alt={ad.title} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
      </CardMedia>
      <CardBody>
        <CardTitle>
          <Link to={`/ads/${ad.id}`} className="uk-link-reset">{ad.title}</Link>
        </CardTitle>
        {ad.price && (
          <p className="uk-text-primary uk-text-bold">
            {ad.price.amount} {ad.price.currency}
          </p>
        )}
        {ad.location?.city && (
          <p className="uk-text-meta">
            {ad.location.city.name}, {ad.location.city.country}
          </p>
        )}
      </CardBody>
    </Card>
  );
};
