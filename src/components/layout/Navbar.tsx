import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import UIkit from 'uikit';
import { useAuth } from '../../context/AuthContext';
import { useUIKit } from '../../hooks/useUIkit';
import {
  Navbar as UkNavbar,
  NavbarContainer,
  NavbarLeft,
  NavbarRight,
  NavbarNav,
  NavbarItem,
  NavbarToggle,
} from '../uikit/Navbar/Navbar';
import { Container } from '../uikit/Container/Container';
import { Offcanvas, OffcanvasBar, OffcanvasClose } from '../uikit/Offcanvas/Offcanvas';
import { Nav, NavItem } from '../uikit/Nav/Nav';
import { Sticky } from '../uikit/Sticky/Sticky';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Gimlee';

const MotionNavbarItem = motion.create(NavbarItem);
const MotionNavItem = motion.create(NavItem);

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { ref: offcanvasRef, instance: offcanvasInstance } = useUIKit<
    UIkit.UIkitOffcanvasElement,
    HTMLDivElement
  >('offcanvas', {
    overlay: true,
    flip: true,
  });

  // Hide offcanvas when navigating to a new page
  useEffect(() => {
    if (offcanvasInstance && isMenuOpen) {
      offcanvasInstance.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Sync isMenuOpen state with UIkit offcanvas events
  useEffect(() => {
    const el = offcanvasRef.current;
    if (!el) return;

    const handleShow = () => setIsMenuOpen(true);
    const handleHide = () => setIsMenuOpen(false);

    el.addEventListener('show', handleShow);
    el.addEventListener('hide', handleHide);

    return () => {
      el.removeEventListener('show', handleShow);
      el.removeEventListener('hide', handleHide);
    };
  }, [offcanvasRef, offcanvasInstance]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const navLinks = (
    <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <React.Fragment key="auth">
          <MotionNavbarItem
            key="my-ads"
            className="uk-visible@m"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/sales/ads">{t('navbar.myAds')}</Link>
          </MotionNavbarItem>
          <MotionNavbarItem
            key="profile"
            className="uk-visible@m"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <Link to="/profile">{t('navbar.profile')}</Link>
          </MotionNavbarItem>
          <MotionNavbarItem
            key="logout"
            className="uk-visible@m"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Link to="#" onClick={handleLogout}>{t('navbar.logout')}</Link>
          </MotionNavbarItem>
        </React.Fragment>
      ) : (
        <React.Fragment key="guest">
          <MotionNavbarItem
            key="login"
            className="uk-visible@m"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/login">{t('navbar.login')}</Link>
          </MotionNavbarItem>
          <MotionNavbarItem
            key="register"
            className="uk-visible@m"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <Link to="/register">{t('navbar.register')}</Link>
          </MotionNavbarItem>
        </React.Fragment>
      )}
    </AnimatePresence>
  );

  const offcanvasLinks = (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        isAuthenticated ? (
          <React.Fragment key="auth-off">
            <MotionNavItem
              key="my-ads-off"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Link to="/sales/ads" uk-toggle="target: #mobile-menu">{t('navbar.myAds')}</Link>
            </MotionNavItem>
            <MotionNavItem
              key="profile-off"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              <Link to="/profile" uk-toggle="target: #mobile-menu">{t('navbar.profile')}</Link>
            </MotionNavItem>
            <MotionNavItem
              key="logout-off"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <Link to="#" onClick={handleLogout} uk-toggle="target: #mobile-menu">{t('navbar.logout')}</Link>
            </MotionNavItem>
          </React.Fragment>
        ) : (
          <React.Fragment key="guest-off">
            <MotionNavItem
              key="login-off"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Link to="/login" uk-toggle="target: #mobile-menu">{t('navbar.login')}</Link>
            </MotionNavItem>
            <MotionNavItem
              key="register-off"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              <Link to="/register" uk-toggle="target: #mobile-menu">{t('navbar.register')}</Link>
            </MotionNavItem>
          </React.Fragment>
        )
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Sticky selTarget=".uk-navbar-container" clsActive="uk-navbar-sticky">
        <NavbarContainer>
          <Container size="expand">
            <UkNavbar>
              <NavbarLeft>
                <Link to="/" className="uk-navbar-item uk-logo">
                  <img src="/gimlee.svg" alt="Gimlee" style={{ height: '40px' }} className="uk-margin-small-right" />
                  <span className="uk-visible@m">{APP_TITLE}</span>
                </Link>
                <NavbarNav>
                  <NavbarItem>
                    <Link to="/ads">{t('navbar.browseAds')}</Link>
                  </NavbarItem>
                </NavbarNav>
              </NavbarLeft>
              <NavbarRight>
                <NavbarNav>
                  {navLinks}
                  <NavbarItem className="uk-hidden@m">
                    <NavbarToggle uk-toggle="target: #mobile-menu">
                      <AnimatePresence mode="wait" initial={false}>
                        {isMenuOpen ? (
                          <motion.span
                            key="close"
                            uk-icon="icon: close"
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'inline-flex' }}
                          />
                        ) : (
                          <motion.span
                            key="menu"
                            uk-navbar-toggle-icon=""
                            initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'inline-flex' }}
                          />
                        )}
                      </AnimatePresence>
                    </NavbarToggle>
                  </NavbarItem>
                </NavbarNav>
              </NavbarRight>
            </UkNavbar>
          </Container>
        </NavbarContainer>
      </Sticky>

      <Offcanvas ref={offcanvasRef} id="mobile-menu" overlay flip>
        <OffcanvasBar>
          <OffcanvasClose />
          <Nav variant="primary" className="uk-margin-large-top">
            <AnimatePresence>
              {isMenuOpen && (
                <MotionNavItem
                  key="browse"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <Link to="/ads" uk-toggle="target: #mobile-menu">{t('navbar.browseAds')}</Link>
                </MotionNavItem>
              )}
            </AnimatePresence>
            {offcanvasLinks}
          </Nav>
        </OffcanvasBar>
      </Offcanvas>
    </>
  );
};

export default Navbar;
