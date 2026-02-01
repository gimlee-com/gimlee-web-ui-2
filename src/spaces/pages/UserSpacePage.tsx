import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, stagger } from 'motion/react';
import { spacesService } from '../services/spacesService';
import type { UserSpaceDto } from '../../types/api';
import { AdCard } from '../../ads/components/AdCard';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Grid } from '../../components/uikit/Grid/Grid';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { SmartPagination } from '../../components/SmartPagination';
import { GeometricAvatar } from '../../components/GeometricAvatar/GeometricAvatar';
import { useNavbarMode } from '../../hooks/useNavbarMode';
import NavbarPortal from '../../components/Navbar/NavbarPortal';
import styles from './UserSpacePage.module.scss';

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
    transition: { type: 'spring', stiffness: 400, damping: 40 }
  }
} as const;

const UserSpacePage: React.FC = () => {
  const { t } = useTranslation();
  const { userName } = useParams<{ userName: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [data, setData] = useState<UserSpaceDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = parseInt(searchParams.get('p') || '0', 10);

  // useNavbarMode automatically handles the back button logic based on location.state.from
  useNavbarMode('focused', '/ads');

  useEffect(() => {
    if (!userName) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    spacesService.fetchUserSpace(userName, page, { signal: controller.signal })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message || t('auth.errors.generic'));
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [userName, page, t]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ p: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !data) {
    return <div className="uk-flex uk-flex-center uk-padding-large"><Spinner ratio={2} /></div>;
  }

  if (error) {
    return (
      <div className="uk-container uk-container-small uk-margin-large-top">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <NavbarPortal>
        <div className="uk-flex uk-flex-middle">
          <div className="uk-margin-small-right">
             <GeometricAvatar username={data.user.username} size={32} />
          </div>
          <Heading as="h5" className="uk-margin-remove uk-text-truncate">
            {data.user.username}
          </Heading>
        </div>
      </NavbarPortal>

      <div className={`${styles.header} uk-flex uk-flex-column uk-flex-middle uk-margin-large-bottom`}>
         <motion.div variants={itemVariants} className={styles.avatarWrapper}>
            <GeometricAvatar username={data.user.username} size={120} />
         </motion.div>
         <motion.div variants={itemVariants}>
            <Heading as="h2" className="uk-margin-small-top">{data.user.username}</Heading>
         </motion.div>
      </div>

      <div className="uk-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${page}`}
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
            <Grid gap="medium" match className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l">
              <AnimatePresence mode="popLayout">
                {data.ads.content.map(ad => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </AnimatePresence>
            </Grid>
            
            {data.ads.page.totalPages > 1 && (
              <motion.div variants={itemVariants} className="uk-margin-large-top">
                <SmartPagination 
                  currentPage={data.ads.page.number} 
                  totalPages={data.ads.page.totalPages} 
                  onPageChange={handlePageChange}
                  className="uk-flex-center"
                />
              </motion.div>
            )}
            
            {data.ads.content.length === 0 && (
              <motion.div variants={itemVariants} className="uk-text-center uk-margin-large-top">
                <div className="uk-card uk-card-default uk-card-body uk-border-rounded">
                  <p className="uk-text-muted">{t('ads.noAdsFound')}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UserSpacePage;
