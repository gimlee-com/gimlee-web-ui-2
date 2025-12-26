import React, { useEffect, useState } from 'react';
import { adService } from '../services/adService';
import type { AdPreviewDto } from '../types/api';
import { AdCard } from '../components/ads/AdCard';
import { Grid } from '../components/uikit/Grid/Grid';
import { Heading } from '../components/uikit/Heading/Heading';
import { Spinner } from '../components/uikit/Spinner/Spinner';

const HomePage: React.FC = () => {
  const [featuredAds, setFeaturedAds] = useState<AdPreviewDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adService.getFeaturedAds()
      .then(response => setFeaturedAds(response.content))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="uk-section uk-section-small">
        <div className="uk-flex uk-flex-between uk-flex-middle">
          <Heading as="h2">Featured Ads</Heading>
        </div>
        {loading ? (
          <div className="uk-flex uk-flex-center">
            <Spinner ratio={2} />
          </div>
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
