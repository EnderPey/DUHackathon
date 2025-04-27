// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext with default null
const AuthContext = createContext(null);

// AuthProvider will wrap the app and manage auth state
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  // On mount, check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || '');
        }
      } catch (err) {
        console.error('Auth check failed', err);
      }
    };
    checkAuth();
  }, []);

  // call this on successful login
  const login = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  // call this on logout
  const logout = () => {
    setUsername('');
    localStorage.removeItem('username');
    fetch('/api/logout', { credentials: 'include' }).catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
