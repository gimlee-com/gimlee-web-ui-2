import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { salesService } from '../services/salesService';
import type { PageSalesOrderDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Table } from '../../components/uikit/Table/Table';
import { Label } from '../../components/uikit/Label/Label';
import { SmartPagination } from '../../components/SmartPagination';
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
      setError(err.message || 'Failed to fetch sales orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETE': return 'success';
      case 'AWAITING_PAYMENT': return 'warning';
      case 'CANCELLED':
      case 'FAILED_PAYMENT_TIMEOUT':
      case 'FAILED_PAYMENT_UNDERPAID': return 'danger';
      default: return 'default';
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
      </div>

      <SalesSubNav />

      {loading && !ordersPage ? (
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
                <th>{t('sales.orderId')}</th>
                <th>{t('sales.date')}</th>
                <th>{t('sales.buyer')}</th>
                <th>{t('sales.total')}</th>
                <th>{t('common.status')}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {ordersPage?.content.map((order) => (
                  <motion.tr
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="uk-text-truncate" style={{ maxWidth: '150px' }}>
                      {order.id}
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {order.buyer.username}
                    </td>
                    <td>
                      {order.totalAmount} {order.currency}
                    </td>
                    <td>
                      <Label variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Label>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {ordersPage?.content.length === 0 && (
                <tr>
                  <td colSpan={5} className="uk-text-center uk-text-muted uk-padding-large">
                    {t('sales.noOrders')}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {ordersPage && ordersPage.totalPages > 1 && (
        <div className="uk-margin-large-top">
          <SmartPagination 
            currentPage={ordersPage.number} 
            totalPages={ordersPage.totalPages} 
            onPageChange={fetchOrders}
            className="uk-flex-center"
          />
        </div>
      )}
    </motion.div>
  );
};

export default SalesOrdersPage;
