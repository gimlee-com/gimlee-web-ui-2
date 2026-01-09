import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Alert } from './uikit/Alert/Alert';
import { Icon } from './uikit/Icon/Icon';

export const ExperimentalDisclaimer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="uk-margin-medium-bottom"
    >
      <Alert variant="primary" className="uk-border-rounded uk-box-shadow-small">
        <div className="uk-flex">
          <div className="uk-margin-small-right uk-flex uk-flex-top">
            <Icon icon="info" ratio={1.2} />
          </div>
          <div>
            <h4 className="uk-alert-title uk-margin-remove" style={{ fontWeight: 600 }}>
              {t('home.disclaimer.title')}
            </h4>
            <div className="uk-margin-small-top">
              <p className="uk-margin-remove">
                {t('home.disclaimer.message')}
              </p>
            </div>
          </div>
        </div>
      </Alert>
    </motion.div>
  );
};
