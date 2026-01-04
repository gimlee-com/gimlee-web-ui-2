import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { salesService } from '../services/salesService';
import type { SalesAdsRequestDto } from '../services/salesService';
import type { AdPreviewDto, PageAdPreviewDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Button } from '../../components/uikit/Button/Button';
import { Grid } from '../../components/uikit/Grid/Grid';
import { SalesAdCard } from '../components/SalesAdCard';
import { SmartPagination } from '../../components/SmartPagination';
import SalesSubNav from '../components/SalesSubNav';

const SalesAdsPage: React.FC = () => {
  const { t } = useTranslation();
  const [adsPage, setAdsPage] = useState<PageAdPreviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAds = useCallback(async (page: number = 0) => {
    setLoading(true);
    try {
      const params: SalesAdsRequestDto = {
        by: 'CREATED_DATE',
        dir: 'DESC',
        p: page
      };
      const response = await salesService.getMyAds(params);
      setAdsPage(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handleToggleStatus = async (ad: AdPreviewDto) => {
    try {
      if (ad.status === 'ACTIVE') {
        await salesService.deactivateAd(ad.id);
      } else {
        await salesService.activateAd(ad.id);
      }
      fetchAds(adsPage?.number || 0);
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
        <Heading as="h2">{t('sales.title')}</Heading>
        <Button variant="primary" onClick={() => navigate('/sales/ads/create')}>
          {t('ads.createNew')}
        </Button>
      </div>

      <SalesSubNav />

      {loading && !adsPage ? (
        <div className="uk-flex uk-flex-center uk-margin-large-top">
          <Spinner ratio={2} />
        </div>
      ) : error ? (
        <div className="uk-alert-danger" uk-alert="">
          <p>{error}</p>
        </div>
      ) : adsPage?.content.length === 0 ? (
        <div className="uk-text-center uk-text-muted uk-padding-large">
          {t('ads.noAdsYet')}
        </div>
      ) : (
        <Grid gap="medium" match className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l">
          <AnimatePresence mode="popLayout">
            {adsPage?.content.map((ad) => (
              <SalesAdCard 
                key={ad.id} 
                ad={ad} 
                onToggleStatus={handleToggleStatus} 
              />
            ))}
          </AnimatePresence>
        </Grid>
      )}

      {adsPage && adsPage.totalPages > 1 && (
        <div className="uk-margin-large-top">
          <SmartPagination 
            currentPage={adsPage.number} 
            totalPages={adsPage.totalPages} 
            onPageChange={fetchAds}
            className="uk-flex-center"
          />
        </div>
      )}
    </motion.div>
  );
};

export default SalesAdsPage;
