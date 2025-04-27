// src/components/NavBar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import { useAuth } from '../contexts/AuthContext';

const NavBar = ({ currentUser, setCurrentUser }) => {
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { credentials: 'include' });
      setCurrentUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.navLinks}>
        <Link className={styles.navLink} to="/">Home</Link>
        <Link className={styles.navLink} to="/chat">Chat</Link>
        <Link className={styles.navLink} to="/events">Events</Link>
        <Link className={styles.navLink} to="/forms">Forms</Link>
      </div>

      <div className={styles.authSection}>
        {username ? (
          <div className={styles.profileDropdown}>
            <button 
              className={styles.profileButton}
              onClick={() => setShowAuthDropdown(!showAuthDropdown)}
            >
              {username} ▼
            </button>
            {showAuthDropdown && (
              <div className={styles.dropdownMenu}>
                <Link to="/profile" className={styles.dropdownItem}>Profile</Link>
                <button 
                  onClick={logout}
                  className={styles.dropdownItem}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authDropdown}>
            <button 
              className={styles.authButton}
              onClick={() => setShowAuthDropdown(!showAuthDropdown)}
            >
              Account ▼
            </button>
            {showAuthDropdown && (
              <div className={styles.dropdownMenu}>
                <Link 
                  to="/login" 
                  className={styles.dropdownItem}
                  onClick={() => setShowAuthDropdown(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={styles.dropdownItem}
                  onClick={() => setShowAuthDropdown(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;