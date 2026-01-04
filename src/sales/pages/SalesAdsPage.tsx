import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { salesService } from '../services/salesService';
import type { SalesAdsRequestDto } from '../services/salesService';
import type { AdPreviewDto, PageAdPreviewDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Button } from '../../components/uikit/Button/Button';
import { Table } from '../../components/uikit/Table/Table';
import { Label } from '../../components/uikit/Label/Label';
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
      ) : (
        <div className="uk-overflow-auto">
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>{t('ads.title')}</th>
                <th>{t('ads.price')}</th>
                <th>{t('common.status')}</th>
                <th className="uk-text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {adsPage?.content.map((ad) => (
                  <motion.tr
                    key={ad.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td>
                      <Link to={`/ads/${ad.id}`} className="uk-link-reset uk-text-bold">
                        {ad.title}
                      </Link>
                    </td>
                    <td>
                      {ad.price ? `${ad.price.amount} ${ad.price.currency}` : '-'}
                    </td>
                    <td>
                      <Label variant={ad.status === 'ACTIVE' ? 'success' : 'warning'}>
                        {ad.status}
                      </Label>
                    </td>
                    <td className="uk-text-right">
                      <div className="uk-button-group">
                        <Link 
                          to={`/sales/ads/edit/${ad.id}`} 
                          className="uk-button uk-button-default uk-button-small"
                        >
                          {t('common.edit')}
                        </Link>
                        <Button 
                          size="small" 
                          variant={ad.status === 'ACTIVE' ? 'default' : 'primary'}
                          onClick={() => handleToggleStatus(ad)}
                          className="uk-margin-small-left"
                        >
                          {ad.status === 'ACTIVE' ? t('ads.deactivate') : t('ads.activate')}
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {adsPage?.content.length === 0 && (
                <tr>
                  <td colSpan={4} className="uk-text-center uk-text-muted uk-padding-large">
                    {t('ads.noAdsYet')}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
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
