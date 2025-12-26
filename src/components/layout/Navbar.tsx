import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Navbar as UkNavbar,
  NavbarContainer,
  NavbarLeft,
  NavbarRight,
  NavbarNav,
  NavbarItem,
} from '../uikit/Navbar/Navbar';
import { Button } from '../uikit/Button/Button';

const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'Gimlee';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <NavbarContainer>
        <div className="uk-container uk-container-expand">
          <UkNavbar>
            <NavbarLeft>
              <Link to="/" className="uk-navbar-item uk-logo">
                <img src="/gimlee.svg" alt="Gimlee" style={{ height: '40px' }} className="uk-margin-small-right" />
                {APP_TITLE}
              </Link>
            <NavbarNav>
              <NavbarItem>
                <Link to="/ads">Browse Ads</Link>
              </NavbarItem>
            </NavbarNav>
          </NavbarLeft>
          <NavbarRight>
            <NavbarNav>
              {isAuthenticated ? (
                <>
                  <NavbarItem>
                    <Link to="/my-ads">My Ads</Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/profile">Profile</Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Button variant="text" onClick={handleLogout}>Logout</Button>
                  </NavbarItem>
                </>
              ) : (
                <>
                  <NavbarItem>
                    <Link to="/login">Login</Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link to="/register">Register</Link>
                  </NavbarItem>
                </>
              )}
            </NavbarNav>
          </NavbarRight>
        </UkNavbar>
      </div>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
