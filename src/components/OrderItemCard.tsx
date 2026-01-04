import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Heading } from './uikit/Heading/Heading';
import { Card, CardBody } from './uikit/Card/Card';
import { Label } from './uikit/Label/Label';
import { Grid } from './uikit/Grid/Grid';
import { Icon } from './uikit/Icon/Icon';
import { Progress } from './uikit/Progress/Progress';
import { Button } from './uikit/Button/Button';
import { purchaseService } from '../ads/services/purchaseService';
import { PurchaseModal } from '../ads/components/PurchaseModal';
import type { PurchaseHistoryDto, SalesOrderDto, PurchaseStatus, PurchaseStatusResponseDto, PurchaseResponseDto } from '../types/api';

interface OrderItemCardProps {
  order: PurchaseHistoryDto | SalesOrderDto;
  type: 'purchase' | 'sale';
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ order, type }) => {
  const { t } = useTranslation();
  const isPurchase = type === 'purchase';
  const [isExpanded, setIsExpanded] = useState(false);
  const [statusDetails, setStatusDetails] = useState<PurchaseStatusResponseDto | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activePurchaseFromStorage, setActivePurchaseFromStorage] = useState<PurchaseResponseDto | null>(null);

  React.useEffect(() => {
    const stored = localStorage.getItem('activePurchase');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        if (p.purchaseId === order.id) {
          setActivePurchaseFromStorage(p);
        }
      } catch (e) { /* ignore */ }
    }
  }, [order.id]);

  const fetchStatus = async () => {
    if (!isPurchase || order.status !== 'AWAITING_PAYMENT') return;
    setLoadingStatus(true);
    try {
      const details = await purchaseService.getPurchaseStatus(order.id);
      setStatusDetails(details);
    } catch (error) {
      console.error('Failed to fetch status', error);
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleExpand = () => {
    const nextExpanded = !isExpanded;
    setIsExpanded(nextExpanded);
    if (nextExpanded && !statusDetails) {
      fetchStatus();
    }
  };
  const counterparty = isPurchase 
    ? (order as PurchaseHistoryDto).seller.username 
    : (order as SalesOrderDto).buyer.username;

  const getStatusVariant = (status: PurchaseStatus) => {
    switch (status) {
      case 'COMPLETE': return 'success';
      case 'AWAITING_PAYMENT': return 'warning';
      case 'CANCELLED':
      case 'FAILED_PAYMENT_TIMEOUT':
      case 'FAILED_PAYMENT_UNDERPAID': return 'danger';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getStatusLabel = (status: PurchaseStatus) => {
    switch (status) {
      case 'AWAITING_PAYMENT': return t('purchases.statusAwaiting');
      case 'COMPLETE': return t('purchases.statusComplete');
      case 'CANCELLED': return t('purchases.statusCancelled');
      case 'FAILED_PAYMENT_TIMEOUT': return t('purchases.statusFailedTimeout');
      case 'FAILED_PAYMENT_UNDERPAID': return t('purchases.statusFailedUnderpaid');
      default: return status;
    }
  };

  return (
    <Card className="uk-margin-small-bottom uk-border-rounded uk-box-shadow-small uk-box-shadow-hover-medium transition-all">
      <CardBody className="uk-padding-small">
        <div 
          className="uk-flex uk-flex-between uk-flex-middle uk-cursor-pointer" 
          onClick={handleExpand}
        >
          <div className="uk-width-expand">
            <div className="uk-flex uk-flex-middle uk-margin-small-bottom">
              <span className="uk-text-meta uk-margin-small-right">#{order.id.substring(0, 8)}...</span>
              <Label variant={getStatusVariant(order.status)} size="small">
                {getStatusLabel(order.status)}
              </Label>
            </div>
            
            <h4 className="uk-margin-remove uk-text-bold">
              {order.items.map(item => item.title).join(', ')}
            </h4>
            
            <div className="uk-text-meta uk-margin-small-top">
              <span className="uk-margin-small-right">
                <Icon icon={isPurchase ? 'cart' : 'tag'} ratio={0.8} className="uk-margin-small-right" />
                {isPurchase ? t('purchases.seller') : t('sales.buyer')}: <span className="uk-text-emphasis">{counterparty}</span>
              </span>
              <span>
                <Icon icon="calendar" ratio={0.8} className="uk-margin-small-right" />
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="uk-text-right uk-margin-left">
            <div className="uk-text-large uk-text-bold uk-text-primary">
              {order.totalAmount} {order.currency}
            </div>
            <Icon 
              icon={isExpanded ? 'chevron-up' : 'chevron-down'} 
              ratio={1.2} 
              className="uk-text-muted uk-margin-small-top" 
            />
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="uk-overflow-hidden"
            >
              <hr className="uk-margin-small" />
              <div className="uk-padding-small uk-background-muted uk-border-rounded">
                <Heading as="h5" className="uk-margin-small-bottom">{t('purchases.items' as any, 'Items')}</Heading>
                <ul className="uk-list uk-list-divider uk-margin-remove">
                  {order.items.map((item, index) => (
                    <li key={index} className="uk-flex uk-flex-between uk-flex-middle">
                      <div>
                        <span className="uk-text-bold">{item.title}</span>
                        <div className="uk-text-meta">
                          {item.quantity} x {item.unitPrice} {order.currency}
                        </div>
                      </div>
                      <div className="uk-text-emphasis">
                        {(item.quantity * item.unitPrice).toFixed(2)} {order.currency}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="uk-margin-small-top uk-text-meta">
                   {t('common.status')}: <span className="uk-text-emphasis">{order.paymentStatus || order.status}</span>
                </div>

                {isPurchase && statusDetails && (
                  <div className="uk-margin-small-top">
                    <p className="uk-text-small uk-margin-remove-bottom">
                      {t('purchases.paymentProgress', { 
                        paid: statusDetails.paidAmount || 0, 
                        total: statusDetails.totalAmount || order.totalAmount, 
                        currency: order.currency 
                      })}
                    </p>
                    <Progress 
                      value={statusDetails.paidAmount || 0} 
                      max={statusDetails.totalAmount || order.totalAmount}
                      className="uk-margin-remove-top"
                    />
                  </div>
                )}
                
                {order.status === 'AWAITING_PAYMENT' && isPurchase && (
                   <div className="uk-margin-small-top">
                      <p className="uk-text-small uk-text-warning">
                        <Icon icon="info" ratio={0.8} className="uk-margin-small-right" />
                        {t('purchases.paymentInstructions')}
                      </p>
                      {activePurchaseFromStorage && (
                        <Button 
                          size="small" 
                          variant="primary" 
                          onClick={() => setShowPaymentModal(true)}
                        >
                          {t('purchases.viewPaymentInfo' as any, 'View Payment Info')}
                        </Button>
                      )}
                   </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardBody>
      {showPaymentModal && activePurchaseFromStorage && (
        <PurchaseModal 
          purchase={activePurchaseFromStorage} 
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </Card>
  );
};
