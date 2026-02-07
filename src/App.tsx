import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { useAppSelector } from './store';
import { useTheme } from './context/ThemeContext';
import { PurchaseModal } from './purchases/components/PurchaseModal';
import './i18n';
import Navbar from './components/Navbar/Navbar';
import { FLOATING_BUTTON_CONTAINER_ID } from './components/FloatingButton/FloatingButtonPortal';
import styles from './components/FloatingButton/FloatingButton.module.scss';
import HomePage from './pages/HomePage';
import LoginPage from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import VerifyPage from './auth/pages/VerifyPage';
import AdListingPage from './ads/pages/AdListingPage';
import AdDetailsPage from './ads/pages/AdDetailsPage';
import SalesAdsPage from './sales/pages/SalesAdsPage';
import CreateAdPage from './sales/pages/CreateAdPage';
import EditAdPage from './sales/pages/EditAdPage';
import SalesOrdersPage from './sales/pages/SalesOrdersPage';
import PurchasesPage from './purchases/pages/PurchasesPage';
import ProfilePage from './profile/pages/ProfilePage';
import UserSpacePage from './spaces/pages/UserSpacePage';

function App() {
  const { activePurchase, isModalOpen } = useAppSelector(state => state.purchase);
  const { theme } = useTheme();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const colorMap = {
        'light': '#ffffff',
        'dark': '#1a1a1a',
        'dark-unicorn': '#0f0c29',
        'iron-age': '#121415'
      };
      const styleMap = {
        'light': Style.Light,
        'dark': Style.Dark,
        'dark-unicorn': Style.Dark,
        'iron-age': Style.Dark
      };
      
      StatusBar.setBackgroundColor({ color: colorMap[theme] }).catch(() => {});
      StatusBar.setStyle({ style: styleMap[theme] }).catch(() => {});
      StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
    }
  }, [theme]);

  return (
    <div className="App">
      <Navbar />
      <main className="uk-section uk-section-default">
        <div className="uk-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/ads" element={<AdListingPage />} />
            <Route path="/ads/:id" element={<AdDetailsPage />} />
            <Route path="/sales/ads" element={<SalesAdsPage />} />
            <Route path="/sales/ads/create" element={<CreateAdPage />} />
            <Route path="/sales/ads/edit/:id" element={<EditAdPage />} />
            <Route path="/sales/orders" element={<SalesOrdersPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/u/:userName" element={<UserSpacePage />} />
          </Routes>
        </div>
      </main>
      {activePurchase && isModalOpen && (
        <PurchaseModal 
          purchase={activePurchase} 
        />
      )}
      <div id={FLOATING_BUTTON_CONTAINER_ID} className={styles.floatingButtonContainer} />
    </div>
  );
}

export default App;
