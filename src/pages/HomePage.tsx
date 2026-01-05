import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adService } from '../ads/services/adService';
import type { AdPreviewDto } from '../types/api';
import { AdCard } from '../ads/components/AdCard';
import { Grid } from '../components/uikit/Grid/Grid';
import { Heading } from '../components/uikit/Heading/Heading';
import { Spinner } from '../components/uikit/Spinner/Spinner';
import { Alert } from '../components/uikit/Alert/Alert';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [featuredAds, setFeaturedAds] = useState<AdPreviewDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adService.getFeaturedAds()
      .then(response => setFeaturedAds(response.content))
      .catch(err => setError(err.message || t('auth.errors.generic')))
      .finally(() => setLoading(false));
  }, [t]);

  return (
    <div>
      <section className="uk-section uk-section-small">
        <div className="uk-flex uk-flex-between uk-flex-middle">
          <Heading as="h2">{t('home.featuredAds')}</Heading>
        </div>
        {loading ? (
          <div className="uk-flex uk-flex-center">
            <Spinner ratio={2} />
          </div>
        ) : error ? (
          <Alert variant="danger">
            {error}
          </Alert>
        ) : (
          <Grid gap="small" match className="uk-child-width-1-2@s uk-child-width-1-4@m">
            {featuredAds.map(ad => (
              <div key={ad.id}>
                <AdCard ad={ad} />
              </div>
            ))}
          </Grid>
        )}
      </section>
    </div>
  );
};

export default HomePage;
