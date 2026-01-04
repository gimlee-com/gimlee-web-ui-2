import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SalesSubNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isAdsActive = location.pathname.startsWith('/sales/ads');
  const isOrdersActive = location.pathname.startsWith('/sales/orders');

  return (
    <div className="uk-margin-medium-bottom">
      <ul uk-tab="">
        <li className={isAdsActive ? 'uk-active' : ''}>
          <Link to="/sales/ads">{t('sales.myAds')}</Link>
        </li>
        <li className={isOrdersActive ? 'uk-active' : ''}>
          <Link to="/sales/orders">{t('sales.orders')}</Link>
        </li>
      </ul>
    </div>
  );
};

export default SalesSubNav;
