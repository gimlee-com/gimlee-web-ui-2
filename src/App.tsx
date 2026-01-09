import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './i18n';
import Navbar from './components/Navbar/Navbar';
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
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
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
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
