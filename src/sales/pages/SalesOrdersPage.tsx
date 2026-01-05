import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { salesService } from '../services/salesService';
import type { PageSalesOrderDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Grid } from '../../components/uikit/Grid/Grid';
import { Alert } from '../../components/uikit/Alert/Alert';
import { SmartPagination } from '../../components/SmartPagination';
import { OrderItemCard } from '../../components/OrderItemCard';
import SalesSubNav from '../components/SalesSubNav';

const SalesOrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const [ordersPage, setOrdersPage] = useState<PageSalesOrderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await salesService.getSalesOrders(page);
      setOrdersPage(response);
    } catch (err: any) {
      setError(err.message || t('auth.errors.generic'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-bottom">
        <Heading as="h2">{t('sales.title')}</Heading>
      </div>

      <SalesSubNav />

      {loading && !ordersPage ? (
        <div className="uk-flex uk-flex-center uk-margin-large-top">
          <Spinner ratio={2} />
        </div>
      ) : error ? (
        <Alert variant="danger">
          {error}
        </Alert>
      ) : (
        <div>
          <Grid gap="medium" className="uk-child-width-1-1 uk-child-width-1-2@m">
            <AnimatePresence mode="popLayout">
              {ordersPage?.content.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <OrderItemCard order={order} type="sale" />
                </motion.div>
              ))}
            </AnimatePresence>
          </Grid>
          {ordersPage?.content.length === 0 && (
            <div className="uk-text-center uk-text-muted uk-padding-large">
              {t('sales.noOrders')}
            </div>
          )}
        </div>
      )}

      {ordersPage && ordersPage.page.totalPages > 1 && (
        <div className="uk-margin-large-top">
          <SmartPagination 
            currentPage={ordersPage.page.number} 
            totalPages={ordersPage.page.totalPages} 
            onPageChange={fetchOrders}
            className="uk-flex-center"
          />
        </div>
      )}
    </motion.div>
  );
};

export default SalesOrdersPage;
