import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
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

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Gimlee';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const navLinks = isAuthenticated ? (
    <>
      <NavbarItem className="uk-visible@m">
        <Link to="/my-ads">{t('navbar.myAds')}</Link>
      </NavbarItem>
      <NavbarItem className="uk-visible@m">
        <Link to="/profile">{t('navbar.profile')}</Link>
      </NavbarItem>
      <NavbarItem className="uk-visible@m">
        <Link to="#" onClick={handleLogout}>{t('navbar.logout')}</Link>
      </NavbarItem>
    </>
  ) : (
    <>
      <NavbarItem className="uk-visible@m">
        <Link to="/login">{t('navbar.login')}</Link>
      </NavbarItem>
      <NavbarItem className="uk-visible@m">
        <Link to="/register">{t('navbar.register')}</Link>
      </NavbarItem>
    </>
  );

  const offcanvasLinks = isAuthenticated ? (
    <>
      <NavItem>
        <Link to="/my-ads" uk-toggle="target: #mobile-menu">My Ads</Link>
      </NavItem>
      <NavItem>
        <Link to="/profile" uk-toggle="target: #mobile-menu">Profile</Link>
      </NavItem>
      <NavItem>
        <Link to="#" onClick={handleLogout} uk-toggle="target: #mobile-menu">Logout</Link>
      </NavItem>
    </>
  ) : (
    <>
      <NavItem>
        <Link to="/login" uk-toggle="target: #mobile-menu">Login</Link>
      </NavItem>
      <NavItem>
        <Link to="/register" uk-toggle="target: #mobile-menu">Register</Link>
      </NavItem>
    </>
  );

  return (
    <>
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
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
                    <NavbarToggle uk-toggle="target: #mobile-menu" />
                  </NavbarItem>
                </NavbarNav>
              </NavbarRight>
            </UkNavbar>
          </Container>
        </NavbarContainer>
      </div>

      <Offcanvas id="mobile-menu" overlay flip>
        <OffcanvasBar>
          <OffcanvasClose />
          <Nav variant="primary" className="uk-margin-large-top">
            <NavItem>
              <Link to="/ads" uk-toggle="target: #mobile-menu">Browse Ads</Link>
            </NavItem>
            {offcanvasLinks}
          </Nav>
        </OffcanvasBar>
      </Offcanvas>
    </>
  );
};

export default Navbar;
