import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { paymentService } from '../../payments/services/paymentService';
import { userService } from '../services/userService';
import { useAuth } from '../../context/AuthContext';
import type { PirateChainTransaction } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Button } from '../../components/uikit/Button/Button';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Table } from '../../components/uikit/Table/Table';
import { Spinner } from '../../components/uikit/Spinner/Spinner';

const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [viewKey, setViewKey] = useState('');
  const [transactions, setTransactions] = useState<PirateChainTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    paymentService.getPirateChainTransactions()
      .then(setTransactions)
      .catch(() => {}) // Ignore if not set up yet
      .finally(() => setLoading(false));
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

  const handleSaveViewKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await paymentService.addPirateChainViewKey(viewKey);
      setSuccess(t('profile.keyUpdated'));
      setViewKey('');
      // Refresh transactions
      const txs = await paymentService.getPirateChainTransactions();
      setTransactions(txs);
    } catch (err: any) {
      setError(err.message || 'Failed to update viewing key.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Heading as="h2">{t('profile.title')}</Heading>

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
  
      <div className="uk-card uk-card-default uk-card-body uk-margin-large-bottom">
        <Heading as="h4">{t('profile.paymentMonitoring')}</Heading>
        <p>{t('profile.paymentDesc')}</p>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <form onSubmit={handleSaveViewKey} className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <input
              className="uk-input"
              type="text"
              placeholder={t('profile.viewKeyPlaceholder')}
              value={viewKey}
              onChange={(e) => setViewKey(e.target.value)}
              required
            />
          </div>
          <div className="uk-width-auto">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? t('ads.saving') : t('profile.saveKey')}
            </Button>
          </div>
        </form>
      </div>

      <div className="uk-margin-large-top">
        <Heading as="h4">{t('profile.recentTransactions')}</Heading>
        {loading ? (
          <Spinner />
        ) : (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>TXID</th>
                <th>{t('ads.price')} (ARRR)</th>
                <th>Confirmations</th>
                <th>Memo</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.txid}>
                  <td className="uk-text-truncate" style={{ maxWidth: '200px' }} title={tx.txid}>{tx.txid}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.confirmations}</td>
                  <td>{tx.memo || '-'}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="uk-text-center">{t('profile.noTransactions')}</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
