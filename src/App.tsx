import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './i18n';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage';
import AdListingPage from './pages/AdListingPage';
import AdDetailsPage from './pages/AdDetailsPage';
import MyAdsPage from './pages/MyAdsPage';
import EditAdPage from './pages/EditAdPage';
import ProfilePage from './pages/ProfilePage';
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
                <Route path="/my-ads" element={<MyAdsPage />} />
                <Route path="/my-ads/edit/:id" element={<EditAdPage />} />
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
