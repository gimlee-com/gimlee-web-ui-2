import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import type { AdPreviewDto } from '../../types/api';
import { Card, CardMedia, CardBody, CardTitle } from '../../components/uikit/Card/Card';
import { Label } from '../../components/uikit/Label/Label';
import { Button } from '../../components/uikit/Button/Button';
import { Icon } from '../../components/uikit/Icon/Icon';
import { Grid } from '../../components/uikit/Grid/Grid';

interface SalesAdCardProps {
  ad: AdPreviewDto;
  onToggleStatus: (ad: AdPreviewDto) => void;
}

const API_URL = import.meta.env.VITE_API_URL || '';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
} as const;

export const SalesAdCard: React.FC<SalesAdCardProps> = ({ ad, onToggleStatus }) => {
  const { t } = useTranslation();
  const photoUrl = ad.mainPhotoPath 
    ? `${API_URL}/api/media?p=${ad.mainPhotoPath}` 
    : '/placeholder-image.svg';

  const statusVariant = ad.status === 'ACTIVE' ? 'success' : 'warning';

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card variant="default" className="uk-height-1-1 uk-flex uk-flex-column">
        <CardMedia position="top">
          <div className="uk-inline uk-width-1-1">
            <img 
              src={photoUrl} 
              alt={ad.title} 
              style={{ height: '180px', objectFit: 'cover', width: '100%' }} 
            />
            <div className="uk-overlay uk-position-top-right uk-padding-remove uk-margin-small">
              <Label variant={statusVariant}>{ad.status}</Label>
            </div>
          </div>
        </CardMedia>
        <CardBody className="uk-flex-1">
          <CardTitle className="uk-margin-small-bottom">
            <Link to={`/ads/${ad.id}`} className="uk-link-reset uk-text-bold">
              {ad.title}
            </Link>
          </CardTitle>
          
          <div className="uk-margin-small-bottom">
            {ad.price ? (
              <span className="uk-text-primary uk-text-lead uk-text-bold">
                {ad.price.amount} {ad.price.currency}
              </span>
            ) : (
              <span className="uk-text-muted">{t('ads.price')}: -</span>
            )}
          </div>

          <div className="uk-text-meta uk-margin-small-bottom">
            {ad.location?.city && (
              <div className="uk-flex uk-flex-middle uk-margin-xsmall-bottom">
                <Icon icon="location" ratio={0.8} className="uk-margin-small-right" />
                {ad.location.city.name}, {ad.location.city.country}
              </div>
            )}
            {ad.createdAt && (
              <div className="uk-flex uk-flex-middle uk-margin-xsmall-bottom">
                <Icon icon="calendar" ratio={0.8} className="uk-margin-small-right" />
                {new Date(ad.createdAt).toLocaleDateString()}
              </div>
            )}
            {ad.stock !== undefined && (
              <div className="uk-flex uk-flex-middle">
                <Icon icon="cart" ratio={0.8} className="uk-margin-small-right" />
                {t('ads.stock')}: {ad.availableStock ?? ad.stock} / {ad.stock}
              </div>
            )}
          </div>
        </CardBody>
        <div className="uk-card-footer uk-padding-small">
          <Grid gap="small" className="uk-child-width-1-2">
            <div>
              <Link 
                to={`/sales/ads/edit/${ad.id}`} 
                className="uk-button uk-button-default uk-button-small uk-width-1-1"
              >
                {t('common.edit')}
              </Link>
            </div>
            <div>
              <Button 
                size="small" 
                variant={ad.status === 'ACTIVE' ? 'default' : 'primary'}
                onClick={() => onToggleStatus(ad)}
                className="uk-width-1-1"
              >
                {ad.status === 'ACTIVE' ? t('ads.deactivate') : t('ads.activate')}
              </Button>
            </div>
          </Grid>
        </div>
      </Card>
    </motion.div>
  );
};
