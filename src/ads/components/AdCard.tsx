import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { AdPreviewDto } from '../../types/api';
import { Card, CardBody } from '../../components/uikit/Card/Card';
import { Label } from '../../components/uikit/Label/Label';
import { Icon } from '../../components/uikit/Icon/Icon';
import { formatPrice } from '../../utils/currencyUtils';
import { Image } from '../../components/Image/Image';
import styles from './AdCard.module.scss';

interface AdCardProps {
  ad: AdPreviewDto;
}

const API_URL = import.meta.env.VITE_API_URL || '';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 40 }
  }
} as const;

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const photoUrl = ad.mainPhotoPath ? `${API_URL}/api/media?p=/thumbs-sm${ad.mainPhotoPath}` : '/placeholder-image.svg';

  const isNew = ad.createdAt && (new Date().getTime() - new Date(ad.createdAt).getTime()) < 3 * 24 * 60 * 60 * 1000;
  const isSold = ad.status === 'SOLD';
  const isOutOfStock = ad.availableStock === 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="uk-height-1-1"
    >
      <Card className={styles.adCard}>
        <div className={styles.mediaWrapper}>
          <div className={styles.badges}>
            {isSold && <Label variant="danger">{t('ads.status.sold')}</Label>}
            {!isSold && isOutOfStock && <Label variant="warning">{t('ads.status.outOfStock')}</Label>}
            {isNew && !isSold && <Label variant="success">{t('ads.status.new')}</Label>}
          </div>
          <Image 
            src={photoUrl} 
            alt={ad.title} 
            className={styles.image} 
            containerClassName={styles.image}
            loading="lazy" 
          />
        </div>

        <CardBody className={styles.content}>
          <Link 
            to={`/ads/${ad.id}`} 
            state={{ from: location.pathname + location.search }}
            className={styles.title}
          >
            {ad.title}
          </Link>

          <div className={styles.priceWrapper}>
            {ad.preferredPrice ? (
              <>
                <span className={styles.primaryPrice}>
                  {formatPrice(ad.preferredPrice.amount, ad.preferredPrice.currency)}
                </span>
                {ad.price && (
                  <span className={styles.secondaryPrice}>
                    ({formatPrice(ad.price.amount, ad.price.currency)})
                  </span>
                )}
              </>
            ) : ad.price && (
              <span className={styles.primaryPrice}>
                {formatPrice(ad.price.amount, ad.price.currency)}
              </span>
            )}
          </div>

          {ad.location?.city && (
            <div className={styles.locationWrapper}>
              <span className={styles.icon}>
                <Icon icon="location" ratio={0.8} />
              </span>
              <span>
                {ad.location.city.name}{ad.location.city.district ? `, ${ad.location.city.district}` : ''}
              </span>
            </div>
          )}

          <div className={styles.footer}>
            {ad.availableStock !== undefined && ad.availableStock > 0 && ad.availableStock <= 5 ? (
              <span className={`${styles.stock} ${styles.low}`}>
                {t('ads.onlyLeft', { count: ad.availableStock })}
              </span>
            ) : (
               <span className={styles.date}>
                 {ad.createdAt && new Date(ad.createdAt).toLocaleDateString()}
               </span>
            )}
            
            <Icon icon="chevron-right" ratio={0.8} className="uk-text-muted" />
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
