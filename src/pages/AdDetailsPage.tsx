import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { adService } from '../services/adService';
import type { AdDetailsDto } from '../types/api';
import { Heading } from '../components/uikit/Heading/Heading';
import { Spinner } from '../components/uikit/Spinner/Spinner';
import { Grid } from '../components/uikit/Grid/Grid';
import { Lightbox, LightboxItem } from '../components/uikit/Lightbox/Lightbox';

const API_URL = import.meta.env.VITE_API_URL || '';

const AdDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<AdDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      adService.getAdById(id)
        .then(setAd)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="uk-flex uk-flex-center"><Spinner ratio={2} /></div>;
  }

  if (!ad) {
    return <div>{t('ads.notFound')}</div>;
  }

  const images = ad.mediaPaths?.map(path => ({
    src: `${API_URL}/api/media?p=${path}`,
    alt: ad.title
  })) || [];

  return (
    <div>
      <Grid gap="large">
        <div className="uk-width-2-3@m">
          {images.length > 0 ? (
            <Lightbox>
              <div className="uk-child-width-1-2@s uk-grid-small" uk-grid="">
                {images.map((img, index) => (
                  <div key={index}>
                    <LightboxItem href={img.src} caption={img.alt}>
                      <img src={img.src} alt={img.alt} className="uk-border-rounded" />
                    </LightboxItem>
                  </div>
                ))}
              </div>
            </Lightbox>
          ) : (
            <div className="uk-placeholder uk-text-center">{t('ads.noImages')}</div>
          )}
        </div>
        <div className="uk-width-1-3@m">
          <Heading as="h2">{ad.title}</Heading>
          {ad.price && (
            <p className="uk-text-large uk-text-primary uk-text-bold">
              {ad.price.amount} {ad.price.currency}
            </p>
          )}
          <hr />
          <div className="uk-margin">
            <Heading as="h4">{t('ads.description')}</Heading>
            <p className="uk-text-break">{ad.description || t('ads.noDescription')}</p>
          </div>
          {ad.location?.city && (
            <div className="uk-margin">
              <Heading as="h4">{t('ads.location')}</Heading>
              <p>{ad.location.city.name}, {ad.location.city.country}</p>
            </div>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default AdDetailsPage;
