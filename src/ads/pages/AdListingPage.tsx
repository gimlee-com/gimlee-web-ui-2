import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, stagger } from 'motion/react';
import { adService } from '../services/adService';
import type { PageAdPreviewDto } from '../../types/api';
import { AdCard } from '../components/AdCard';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Grid } from '../../components/uikit/Grid/Grid';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { SmartPagination } from '../../components/SmartPagination';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.1)
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
} as const;

const AdListingPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<PageAdPreviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState(searchParams.get('t') || '');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = Object.fromEntries(searchParams.entries());
    adService.searchAds(params)
      .then(setData)
      .catch(err => setError(err.message || t('auth.errors.generic')))
      .finally(() => setLoading(false));
  }, [searchParams, t]);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Heading as="h2">{t('ads.browseTitle')}</Heading>
      </motion.div>
  
      <motion.div variants={itemVariants}>
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
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="uk-flex uk-flex-center"
          >
            <Spinner ratio={2} />
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            variants={itemVariants}
          >
            <Alert variant="danger">
              {error}
            </Alert>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: stagger(0.05)
                }
              }
            }}
          >
            <Grid gap="medium" match className="uk-child-width-1-2@s uk-child-width-1-4@m">
              <AnimatePresence mode="popLayout">
                {data?.content.map(ad => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </AnimatePresence>
            </Grid>
            
            {data && data.page.totalPages > 1 && (
              <motion.div variants={itemVariants} className="uk-margin-large-top">
                <SmartPagination 
                  currentPage={data.page.number} 
                  totalPages={data.page.totalPages} 
                  onPageChange={handlePageChange}
                  className="uk-flex-center"
                />
              </motion.div>
            )}
            
            {data?.content.length === 0 && (
              <motion.div variants={itemVariants} className="uk-text-center uk-margin-large-top">
                <p>{t('ads.noAdsFound')}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdListingPage;
