import React, { useEffect, useState } from 'react';
import { paymentService } from '../services/paymentService';
import type { PirateChainTransaction } from '../types/api';
import { Heading } from '../components/uikit/Heading/Heading';
import { Button } from '../components/uikit/Button/Button';
import { Alert } from '../components/uikit/Alert/Alert';
import { Table } from '../components/uikit/Table/Table';
import { Spinner } from '../components/uikit/Spinner/Spinner';

const ProfilePage: React.FC = () => {
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

  const handleSaveViewKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await paymentService.addPirateChainViewKey(viewKey);
      setSuccess('Viewing key updated successfully.');
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
      <Heading as="h2">Profile & Settings</Heading>
      
      <div className="uk-card uk-card-default uk-card-body uk-margin-large-bottom">
        <Heading as="h4">Pirate Chain Payment Monitoring</Heading>
        <p>To enable payment monitoring for your ads, please provide your Pirate Chain Viewing Key (z-view key). This allows the service to see incoming transactions without having access to your funds.</p>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <form onSubmit={handleSaveViewKey} className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <input
              className="uk-input"
              type="text"
              placeholder="Enter your zxview... key"
              value={viewKey}
              onChange={(e) => setViewKey(e.target.value)}
              required
            />
          </div>
          <div className="uk-width-auto">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Key'}
            </Button>
          </div>
        </form>
      </div>

      <div className="uk-margin-large-top">
        <Heading as="h4">Recent Pirate Chain Transactions</Heading>
        {loading ? (
          <Spinner />
        ) : (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>TXID</th>
                <th>Amount (ARRR)</th>
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
                  <td colSpan={4} className="uk-text-center">No transactions found.</td>
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
