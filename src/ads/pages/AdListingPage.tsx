import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { adService } from '../services/adService';
import type { PageAdPreviewDto } from '../../types/api';
import { AdCard } from '../components/AdCard';
import { Grid } from '../../components/uikit/Grid/Grid';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { SmartPagination } from '../../components/SmartPagination';

const AdListingPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<PageAdPreviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(searchParams.get('t') || '');

  useEffect(() => {
    setLoading(true);
    const params = Object.fromEntries(searchParams.entries());
    adService.searchAds(params)
      .then(setData)
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ t: searchText, p: '0' });
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('p', page.toString());
    setSearchParams(newParams);
  };

  return (
    <div>
      <Heading as="h2">{t('ads.browseTitle')}</Heading>
  
      <form onSubmit={handleSearch} className="uk-margin-medium-bottom">
        <div className="uk-inline uk-width-1-1">
          <span className="uk-form-icon" uk-icon="icon: search"></span>
          <input
            className="uk-input"
            type="text"
            placeholder={t('ads.searchPlaceholder')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </form>

      {loading ? (
        <div className="uk-flex uk-flex-center">
          <Spinner ratio={2} />
        </div>
      ) : (
        <>
          <Grid gap="small" match className="uk-child-width-1-2@s uk-child-width-1-4@m">
            {data?.content.map(ad => (
              <div key={ad.id}>
                <AdCard ad={ad} />
              </div>
            ))}
          </Grid>
          
          {data && data.totalPages > 1 && (
            <div className="uk-margin-large-top">
              <SmartPagination 
                currentPage={data.number} 
                totalPages={data.totalPages} 
                onPageChange={handlePageChange}
                className="uk-flex-center"
              />
            </div>
          )}
          
          {data?.content.length === 0 && (
            <div className="uk-text-center uk-margin-large-top">
              <p>{t('ads.noAdsFound')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdListingPage;
