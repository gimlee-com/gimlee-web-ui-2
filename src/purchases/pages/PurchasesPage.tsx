import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { purchaseService } from '../services/purchaseService';
import type { PagePurchaseHistoryDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Grid } from '../../components/uikit/Grid/Grid';
import { SmartPagination } from '../../components/SmartPagination';
import { OrderItemCard } from '../../components/OrderItemCard';

const PurchasesPage: React.FC = () => {
  const { t } = useTranslation();
  const [purchasesPage, setPurchasesPage] = useState<PagePurchaseHistoryDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchases = useCallback(async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await purchaseService.getPurchases(page);
      setPurchasesPage(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch purchases');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
        <Heading as="h2">{t('purchases.title')}</Heading>
      </div>

      {loading && !purchasesPage ? (
        <div className="uk-flex uk-flex-center uk-margin-large-top">
          <Spinner ratio={2} />
        </div>
      ) : error ? (
        <div className="uk-alert-danger" uk-alert="">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <Grid gap="medium" className="uk-child-width-1-1 uk-child-width-1-2@m">
            <AnimatePresence mode="popLayout">
              {purchasesPage?.content.map((purchase) => (
                <motion.div
                  key={purchase.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <OrderItemCard order={purchase} type="purchase" />
                </motion.div>
              ))}
            </AnimatePresence>
          </Grid>
          {purchasesPage?.content.length === 0 && (
            <div className="uk-text-center uk-text-muted uk-padding-large">
              {t('purchases.noPurchases')}
            </div>
          )}
        </div>
      )}

      {purchasesPage && purchasesPage.page.totalPages > 1 && (
        <div className="uk-margin-large-top">
          <SmartPagination 
            currentPage={purchasesPage.page.number} 
            totalPages={purchasesPage.page.totalPages} 
            onPageChange={fetchPurchases}
            className="uk-flex-center"
          />
        </div>
      )}
    </motion.div>
  );
};

export default PurchasesPage;
