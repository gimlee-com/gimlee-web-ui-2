import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import UIkit from 'uikit';
import { motion, AnimatePresence } from 'motion/react';
import { paymentService } from '../../payments/services/paymentService';
import { userService } from '../services/userService';
import { useAuth } from '../../context/AuthContext';
import type { PirateChainTransaction, YCashTransaction, CurrencyDto } from '../../types/api';
import { Heading } from '../../components/uikit/Heading/Heading';
import { Button } from '../../components/uikit/Button/Button';
import { Alert } from '../../components/uikit/Alert/Alert';
import { Spinner } from '../../components/uikit/Spinner/Spinner';
import { Input, FormLabel } from '../../components/uikit/Form/Form';
import { Dropdown } from '../../components/uikit/Dropdown/Dropdown';
import { Nav, NavItem } from '../../components/uikit/Nav/Nav';
import { Card, CardBody } from '../../components/uikit/Card/Card';
import { Grid } from '../../components/uikit/Grid/Grid';
import { TransactionCard } from '../components/TransactionCard';

const springConfig = { type: 'spring', stiffness: 400, damping: 40 } as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springConfig
  }
};

const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, preferredCurrency, setPreferredCurrency } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [arrrViewKey, setArrrViewKey] = useState('');
  const [yecViewKey, setYecViewKey] = useState('');
  const [arrrTransactions, setArrrTransactions] = useState<PirateChainTransaction[]>([]);
  const [yecTransactions, setYecTransactions] = useState<YCashTransaction[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyDto[]>([]);
  const [currencySearch, setCurrencySearch] = useState('');
  const [loadingArrr, setLoadingArrr] = useState(true);
  const [loadingYec, setLoadingYec] = useState(true);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [savingArrr, setSavingArrr] = useState(false);
  const [savingYec, setSavingYec] = useState(false);
  const [savingCurrency, setSavingCurrency] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filteredCurrencies = currencies.filter(c => 
    c.code.toLowerCase().includes(currencySearch.toLowerCase()) || 
    c.name.toLowerCase().includes(currencySearch.toLowerCase())
  ).slice(0, 10);

  useEffect(() => {
    paymentService.getCurrencies()
      .then(setCurrencies)
      .catch(() => {})
      .finally(() => setLoadingCurrencies(false));

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
    setError(null);
    setSuccess(null);
    i18n.changeLanguage(lang);
    if (isAuthenticated) {
      try {
        await userService.updateUserPreferences({ language: lang });
        setSuccess(t('profile.preferencesUpdated'));
      } catch (err) {
        setError(t('profile.failedToSaveLanguage'));
      }
    }
  };

  const handleCurrencySelect = async (currencyCode: string) => {
    if (!isAuthenticated) return;
    
    if (dropdownRef.current) {
      UIkit.dropdown(dropdownRef.current).hide(false);
    }

    setSavingCurrency(true);
    setError(null);
    setSuccess(null);
    try {
      await userService.updateUserPreferences({ preferredCurrency: currencyCode });
      setPreferredCurrency(currencyCode);
      setSuccess(t('profile.preferencesUpdated'));
      setCurrencySearch('');
    } catch (err: any) {
      setError(err.message || t('profile.failedToSaveCurrency'));
    } finally {
      setSavingCurrency(false);
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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Heading as="h2">{t('profile.title')}</Heading>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springConfig}
            style={{ overflow: 'hidden' }}
          >
            <Alert variant="danger" onClose={() => setError(null)}>{error}</Alert>
          </motion.div>
        )}
        {success && (
          <motion.div
            key="success"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springConfig}
            style={{ overflow: 'hidden' }}
          >
            <Alert variant="success" onClose={() => setSuccess(null)}>{success}</Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={cardVariants} layout transition={springConfig}>
        <Card className="uk-margin-bottom">
          <CardBody>
            <Heading as="h4">{t('profile.regionalSettings')}</Heading>

            <div className="uk-margin">
              <FormLabel>{t('profile.language')}</FormLabel>
              <div className="uk-button-group uk-margin-small-top uk-display-block">
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

            <div className="uk-margin">
              <FormLabel>{t('profile.preferredCurrency')}</FormLabel>
              <div className="uk-margin-small-top">
                {loadingCurrencies ? (
                  <Spinner />
                ) : (
                  <div className="uk-inline uk-width-1-1">
                    <span className="uk-form-icon" uk-icon="icon: search"></span>
                    <Input
                      className="uk-width-1-1"
                      placeholder={t('profile.searchCurrency')}
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      disabled={savingCurrency}
                    />
                    <Dropdown ref={dropdownRef} mode="click" pos="bottom-left" className="uk-width-1-1">
                      <Nav variant="dropdown">
                        {filteredCurrencies.map(c => (
                          <NavItem 
                            key={c.code} 
                            onClick={() => handleCurrencySelect(c.code)}
                            active={c.code === preferredCurrency}
                          >
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <strong>{c.code}</strong> - {c.name}
                            </a>
                          </NavItem>
                        ))}
                        {filteredCurrencies.length === 0 && (
                          <NavItem disabled>
                            {t('ads.noAdsFound')}
                          </NavItem>
                        )}
                      </Nav>
                    </Dropdown>
                  </div>
                )}
                {preferredCurrency && (
                  <div className="uk-margin-small-top uk-text-meta">
                    {t('profile.preferredCurrency')}: <strong>{preferredCurrency}</strong>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <Grid gap="medium" className="uk-child-width-1-2@m">
        <motion.div variants={cardVariants} layout transition={springConfig}>
          <Card className="uk-height-1-1">
            <CardBody>
              <Heading as="h4">{t('profile.paymentMonitoring')}</Heading>
              <p className="uk-text-meta">{t('profile.paymentDesc')}</p>

              <form onSubmit={handleSaveArrrViewKey}>
                <Grid gap="small">
                  <div className="uk-width-expand">
                    <Input
                      className="uk-width-1-1"
                      type="text"
                      placeholder={t('profile.viewKeyPlaceholder')}
                      value={arrrViewKey}
                      onChange={(e) => setArrrViewKey(e.target.value)}
                      required
                    />
                  </div>
                  <div className="uk-width-auto">
                    <Button type="submit" variant="primary" disabled={savingArrr || !arrrViewKey}>
                      {savingArrr ? <Spinner ratio={0.6} /> : t('profile.saveKey')}
                    </Button>
                  </div>
                </Grid>
              </form>

              <div className="uk-margin-large-top">
                <Heading as="h4">{t('profile.recentTransactions')}</Heading>
                <div>
                  {loadingArrr ? (
                    <Spinner />
                  ) : (
                    <AnimatePresence>
                      {arrrTransactions.map((tx, index) => (
                        <motion.div
                          key={tx.txid}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ ...springConfig, delay: index * 0.05 }}
                        >
                          <TransactionCard transaction={tx} currency="ARRR" />
                        </motion.div>
                      ))}
                      {arrrTransactions.length === 0 && (
                        <div className="uk-text-center uk-text-muted uk-padding-small">
                          {t('profile.noTransactions')}
                        </div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} layout transition={springConfig}>
          <Card className="uk-height-1-1">
            <CardBody>
              <Heading as="h4">{t('profile.paymentMonitoringYec')}</Heading>
              <p className="uk-text-meta">{t('profile.paymentDescYec')}</p>

              <form onSubmit={handleSaveYecViewKey}>
                <Grid gap="small">
                  <div className="uk-width-expand">
                    <Input
                      className="uk-width-1-1"
                      type="text"
                      placeholder={t('profile.viewKeyPlaceholder')}
                      value={yecViewKey}
                      onChange={(e) => setYecViewKey(e.target.value)}
                      required
                    />
                  </div>
                  <div className="uk-width-auto">
                    <Button type="submit" variant="primary" disabled={savingYec || !yecViewKey}>
                      {savingYec ? <Spinner ratio={0.6} /> : t('profile.saveKey')}
                    </Button>
                  </div>
                </Grid>
              </form>

              <div className="uk-margin-large-top">
                <Heading as="h4">{t('profile.recentTransactionsYec')}</Heading>
                <div>
                  {loadingYec ? (
                    <Spinner />
                  ) : (
                    <AnimatePresence>
                      {yecTransactions.map((tx, index) => (
                        <motion.div
                          key={tx.txid}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ ...springConfig, delay: index * 0.05 }}
                        >
                          <TransactionCard transaction={tx} currency="YEC" />
                        </motion.div>
                      ))}
                      {yecTransactions.length === 0 && (
                        <div className="uk-text-center uk-text-muted uk-padding-small">
                          {t('profile.noTransactions')}
                        </div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </Grid>
    </motion.div>
  );
};

export default ProfilePage;
