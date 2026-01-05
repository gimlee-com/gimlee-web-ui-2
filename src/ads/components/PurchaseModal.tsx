import { useEffect, useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import type { Transition } from 'motion/react';
import UIkit from 'uikit';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Modal, 
  ModalDialog, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalTitle 
} from '../../components/uikit/Modal/Modal';
import { Button } from '../../components/uikit/Button/Button';
import { Icon } from '../../components/uikit/Icon/Icon';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Progress } from '../../components/uikit/Progress/Progress';
import { purchaseService } from '../services/purchaseService';
import type { PurchaseResponseDto, PurchaseStatus } from '../../types/api';
import { useUIKit } from '../../hooks/useUIkit';
import { useMergeRefs } from '../../hooks/useMergeRefs';

interface PurchaseModalProps {
  purchase: PurchaseResponseDto;
  onClose: () => void;
  onStatusChange?: (status: PurchaseStatus) => void;
}

export const PurchaseModal = forwardRef<HTMLDivElement, PurchaseModalProps>(
  ({ purchase, onClose, onStatusChange }, ref) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<PurchaseStatus>(purchase.status);
    const [paidAmount, setPaidAmount] = useState<number>(purchase.payment.paidAmount);
    const [isCancelling, setIsCancelling] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
    
    const { ref: modalRef, instance: modalInstance } = useUIKit<UIkit.UIkitModalElement, HTMLDivElement>('modal', {
      escClose: false,
      bgClose: false,
      container: false
    });

    const mergedRef = useMergeRefs(modalRef, ref);

    useEffect(() => {
      if (modalInstance) {
        modalInstance.show();
      }
    }, [modalInstance]);

    useEffect(() => {
      const element = modalRef.current;
      if (!element) return;

      const handleHidden = () => {
        onClose();
      };

      UIkit.util.on(element, 'hidden', handleHidden);
    }, [onClose]);

    useEffect(() => {
      if (status === 'AWAITING_PAYMENT') {
        const interval = setInterval(async () => {
          try {
            const response = await purchaseService.getPurchaseStatus(purchase.purchaseId);
            if (response.status !== status) {
              setStatus(response.status);
              onStatusChange?.(response.status);
            }
            if (response.paidAmount !== undefined) {
              setPaidAmount(response.paidAmount);
            }
          } catch (error) {
            console.error('Failed to fetch purchase status', error);
          }
        }, 5000);

        return () => clearInterval(interval);
      }
    }, [purchase.purchaseId, status, onStatusChange]);

    useEffect(() => {
      if (status === 'AWAITING_PAYMENT' && purchase.payment.deadline) {
        const calculateTimeLeft = () => {
          const deadline = new Date(purchase.payment.deadline).getTime();
          const now = new Date().getTime();
          const diff = Math.max(0, Math.floor((deadline - now) / 1000));
          setSecondsLeft(diff);
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
      } else {
        setSecondsLeft(null);
      }
    }, [status, purchase.payment.deadline]);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColorClass = (seconds: number) => {
      if (seconds > 1800) return 'uk-text-primary';
      if (seconds > 600) return 'uk-text-warning';
      return 'uk-text-danger';
    };

    const handleCancel = async () => {
      const confirmMessage = paidAmount > 0 
        ? t('purchases.partialPaymentWarning', { paid: paidAmount, currency: 'ARRR' })
        : t('purchases.confirmCancel');

      if (window.confirm(confirmMessage)) {
        setIsCancelling(true);
        try {
          await purchaseService.cancelPurchase(purchase.purchaseId);
          setStatus('CANCELLED');
          onStatusChange?.('CANCELLED');
        } catch (error: any) {
          console.error('Failed to cancel purchase', error);
          alert(error.message || t('auth.errors.generic'));
        } finally {
          setIsCancelling(false);
        }
      }
    };

    const handleClose = () => {
      if (modalInstance) {
        modalInstance.hide();
      } else {
        onClose();
      }
    };

    const renderStatus = () => {
      switch (status) {
        case 'AWAITING_PAYMENT':
          return (
            <div className="uk-text-center">
              <Spinner 
                ratio={1.5} 
                className={`uk-margin-bottom ${secondsLeft !== null ? getTimerColorClass(secondsLeft) : 'uk-text-primary'}`} 
              />
              <p className={`uk-text-bold uk-margin-small-bottom ${secondsLeft !== null ? getTimerColorClass(secondsLeft) : 'uk-text-primary'}`}>
                {t('purchases.statusAwaiting')}
              </p>
              
              <div className="uk-margin-small-top uk-margin-medium-bottom">
                <p className="uk-text-small uk-margin-remove-bottom">
                  {t('purchases.paymentProgress', { 
                    paid: paidAmount, 
                    total: purchase.payment.amount, 
                    currency: 'ARRR' 
                  })}
                </p>
                <Progress 
                  value={paidAmount} 
                  max={purchase.payment.amount}
                  className="uk-margin-remove-top"
                />
              </div>

              {secondsLeft !== null && (
                <p className={`uk-text-small uk-margin-remove-top ${getTimerColorClass(secondsLeft)}`}>
                  {t('purchases.timeLeft', { time: formatTime(secondsLeft) })}
                </p>
              )}
            </div>
          );
        case 'COMPLETE':
          return (
            <div className="uk-text-center">
              <Icon icon="check" ratio={3} className="uk-text-success uk-margin-bottom" />
              <p className="uk-text-success uk-text-bold">{t('purchases.statusComplete')}</p>
            </div>
          );
        case 'FAILED_PAYMENT_TIMEOUT':
          return (
            <div className="uk-text-center">
              <Icon icon="history" ratio={3} className="uk-text-danger uk-margin-bottom" />
              <p className="uk-text-danger uk-text-bold">{t('purchases.statusFailedTimeout')}</p>
            </div>
          );
        case 'FAILED_PAYMENT_UNDERPAID':
          return (
            <div className="uk-text-center">
              <Icon icon="warning" ratio={3} className="uk-text-danger uk-margin-bottom" />
              <p className="uk-text-danger uk-text-bold">{t('purchases.statusFailedUnderpaid')}</p>
            </div>
          );
        case 'CANCELLED':
          return (
            <div className="uk-text-center">
              <Icon icon="close" ratio={3} className="uk-text-muted uk-margin-bottom" />
              <p className="uk-text-muted uk-text-bold">{t('purchases.statusCancelled')}</p>
            </div>
          );
        default:
          return null;
      }
    };

    const springTransition: Transition = { type: 'spring', stiffness: 300, damping: 30 };

    return (
      <Modal ref={mergedRef} container={false} escClose={false} bgClose={false}>
        <ModalDialog>
          <ModalHeader>
            <ModalTitle>{t('purchases.paymentTitle')}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="uk-grid-small uk-flex-middle" uk-grid="">
              <div className="uk-width-auto">
                <img src="/currencies/pirate-black.svg" alt="ARRR" width="40" height="40" />
              </div>
              <div className="uk-width-expand">
                <p className="uk-margin-remove uk-text-large uk-text-bold">
                  {purchase.payment.amount} ARRR
                </p>
              </div>
            </div>

            <div className="uk-margin-medium-top uk-text-center">
              <div className="uk-inline uk-padding-small uk-border-rounded uk-box-shadow-large">
                <QRCodeSVG 
                  value={purchase.payment.qrCodeUri} 
                  size={200}
                  level="H"
                  marginSize={8}
                  imageSettings={{
                    src: "/currencies/pirate-qr-logo.svg",
                    height: 45,
                    width: 45,
                    excavate: true,
                  }}
                />
              </div>
            </div>

            <div className="uk-margin-medium-top">
              <p className="uk-margin-small-bottom uk-text-muted uk-text-small">{t('purchases.toAddress')}:</p>
              <div className="uk-padding-small uk-background-muted uk-border-rounded uk-text-break uk-text-emphasis uk-text-small">
                {purchase.payment.address}
              </div>
            </div>

            <div className="uk-margin">
              <p className="uk-margin-small-bottom uk-text-muted uk-text-small">{t('purchases.memo')}:</p>
              <div className="uk-padding-small uk-background-muted uk-border-rounded uk-text-emphasis">
                {purchase.payment.memo}
              </div>
            </div>

            <hr />

            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={springTransition}
                className="uk-margin"
              >
                {renderStatus()}
              </motion.div>
            </AnimatePresence>
          </ModalBody>
          <ModalFooter>
            <div className="uk-grid-small uk-child-width-1-1 uk-child-width-auto@s uk-flex-right" uk-grid="">
              {status === 'AWAITING_PAYMENT' && (
                <div>
                  <Button 
                    variant="default" 
                    className="uk-width-1-1" 
                    onClick={handleCancel}
                    disabled={isCancelling}
                  >
                    {isCancelling ? <Spinner ratio={0.6} /> : t('purchases.cancelPurchase')}
                  </Button>
                </div>
              )}
              <div>
                <Button variant="primary" className="uk-width-1-1" onClick={handleClose}>
                  {t('purchases.close')}
                </Button>
              </div>
            </div>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    );
  }
);
