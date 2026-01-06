import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { paymentService } from '../../payments/services/paymentService';
import { userService } from '../services/userService';
import { useAuth } from '../../context/AuthContext';
import type { PirateChainTransaction, YCashTransaction } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Button } from '../../components/uikit/Button/Button';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Table } from '../../components/uikit/Table/Table';
import { Spinner } from '../../components/uikit/Spinner/Spinner';

const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [arrrViewKey, setArrrViewKey] = useState('');
  const [yecViewKey, setYecViewKey] = useState('');
  const [arrrTransactions, setArrrTransactions] = useState<PirateChainTransaction[]>([]);
  const [yecTransactions, setYecTransactions] = useState<YCashTransaction[]>([]);
  const [loadingArrr, setLoadingArrr] = useState(true);
  const [loadingYec, setLoadingYec] = useState(true);
  const [savingArrr, setSavingArrr] = useState(false);
  const [savingYec, setSavingYec] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    paymentService.getPirateChainTransactions()
      .then(setArrrTransactions)
      .catch(() => {}) // Ignore if not set up yet
      .finally(() => setLoadingArrr(false));

    paymentService.getYCashTransactions()
      .then(setYecTransactions)
      .catch(() => {}) // Ignore if not set up yet
      .finally(() => setLoadingYec(false));
  }, []);

  const handleLanguageChange = async (lang: string) => {
    i18n.changeLanguage(lang);
    if (isAuthenticated) {
      try {
        await userService.updateUserPreferences({ language: lang });
      } catch (err) {
        setError(t('profile.failedToSaveLanguage'));
      }
    }
  };

  const handleSaveArrrViewKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingArrr(true);
    setError(null);
    setSuccess(null);
    try {
      await paymentService.addPirateChainViewKey(arrrViewKey);
      setSuccess(t('profile.keyUpdated'));
      setArrrViewKey('');
      // Refresh transactions
      const txs = await paymentService.getPirateChainTransactions();
      setArrrTransactions(txs);
    } catch (err: any) {
      setError(err.message || t('auth.errors.generic'));
    } finally {
      setSavingArrr(false);
    }
  };

  const handleSaveYecViewKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingYec(true);
    setError(null);
    setSuccess(null);
    try {
      await paymentService.addYCashViewKey(yecViewKey);
      setSuccess(t('profile.keyUpdated'));
      setYecViewKey('');
      // Refresh transactions
      const txs = await paymentService.getYCashTransactions();
      setYecTransactions(txs);
    } catch (err: any) {
      setError(err.message || t('auth.errors.generic'));
    } finally {
      setSavingYec(false);
    }
  };

  return (
    <div>
      <Heading as="h2">{t('profile.title')}</Heading>

      {error && <Alert variant="danger" onClose={() => setError(null)}>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)}>{success}</Alert>}

      <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
        <Heading as="h4">{t('profile.language')}</Heading>
        <div className="uk-button-group">
          <Button
            size="small"
            variant={i18n.resolvedLanguage === 'en-US' ? 'primary' : 'default'}
            onClick={() => handleLanguageChange('en-US')}
          >
            English
          </Button>
          <Button
            size="small"
            variant={i18n.resolvedLanguage === 'pl-PL' ? 'primary' : 'default'}
            onClick={() => handleLanguageChange('pl-PL')}
          >
            Polski
          </Button>
        </div>
      </div>
  
      <div className="uk-grid-medium uk-child-width-1-2@m" uk-grid="">
        <div>
          <div className="uk-card uk-card-default uk-card-body">
            <Heading as="h4">{t('profile.paymentMonitoring')}</Heading>
            <p>{t('profile.paymentDesc')}</p>

            <form onSubmit={handleSaveArrrViewKey} className="uk-grid-small" uk-grid="">
              <div className="uk-width-expand">
                <input
                  className="uk-input"
                  type="text"
                  placeholder={t('profile.viewKeyPlaceholder')}
                  value={arrrViewKey}
                  onChange={(e) => setArrrViewKey(e.target.value)}
                  required
                />
              </div>
              <div className="uk-width-auto">
                <Button type="submit" variant="primary" disabled={savingArrr}>
                  {savingArrr ? t('ads.saving') : t('profile.saveKey')}
                </Button>
              </div>
            </form>

            <div className="uk-margin-large-top">
              <Heading as="h4">{t('profile.recentTransactions')}</Heading>
              {loadingArrr ? (
                <Spinner />
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>TXID</th>
                      <th>{t('ads.price')} (ARRR)</th>
                      <th>Confirmations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrrTransactions.map(tx => (
                      <tr key={tx.txid}>
                        <td className="uk-text-truncate" style={{ maxWidth: '100px' }} title={tx.txid}>{tx.txid}</td>
                        <td>{tx.amount}</td>
                        <td>{tx.confirmations}</td>
                      </tr>
                    ))}
                    {arrrTransactions.length === 0 && (
                      <tr>
                        <td colSpan={3} className="uk-text-center">{t('profile.noTransactions')}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="uk-card uk-card-default uk-card-body">
            <Heading as="h4">{t('profile.paymentMonitoringYec')}</Heading>
            <p>{t('profile.paymentDescYec')}</p>

            <form onSubmit={handleSaveYecViewKey} className="uk-grid-small" uk-grid="">
              <div className="uk-width-expand">
                <input
                  className="uk-input"
                  type="text"
                  placeholder={t('profile.viewKeyPlaceholder')}
                  value={yecViewKey}
                  onChange={(e) => setYecViewKey(e.target.value)}
                  required
                />
              </div>
              <div className="uk-width-auto">
                <Button type="submit" variant="primary" disabled={savingYec}>
                  {savingYec ? t('ads.saving') : t('profile.saveKey')}
                </Button>
              </div>
            </form>

            <div className="uk-margin-large-top">
              <Heading as="h4">{t('profile.recentTransactionsYec')}</Heading>
              {loadingYec ? (
                <Spinner />
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>TXID</th>
                      <th>{t('ads.price')} (YEC)</th>
                      <th>Confirmations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yecTransactions.map(tx => (
                      <tr key={tx.txid}>
                        <td className="uk-text-truncate" style={{ maxWidth: '100px' }} title={tx.txid}>{tx.txid}</td>
                        <td>{tx.amount}</td>
                        <td>{tx.confirmations}</td>
                      </tr>
                    ))}
                    {yecTransactions.length === 0 && (
                      <tr>
                        <td colSpan={3} className="uk-text-center">{t('profile.noTransactions')}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
