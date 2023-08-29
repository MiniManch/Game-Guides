import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarProfile from './NavbarProfile';
import { homeLogoImage } from '../../../utils';

import css from './Style/Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUser(storedUsername);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    setForceUpdate(!forceUpdate);
  };

  return (
    <AppBar
      position="fixed"
      className={`${css.navbar} ${isScrolled ? css.sticky : ''}`}
      elevation={0}
      style={{ backgroundColor: 'transparent', zIndex: 1000 }}
    >
      <Toolbar>
        <div className={css.logoContainer}>
        <Link href="/" underline="none">
          <img src={homeLogoImage} alt="Logo" className={css.logoImage} />
        </Link>
        </div>
        <div className={css.navbar_links}>
          {!user ? (
            <>
              <div className={`${css.navbar_link} ${css.animated}`}>
                <Link href="/user/login" underline="none">
                  Login
                </Link>
              </div>
              <div className={`${css.navbar_link} ${css.animated}`}>
                <Link href="/user/new" underline="none">
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <NavbarProfile user={user} onLogout={handleLogout} forceUpdate={forceUpdate} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
