import React, { useState, useEffect } from 'react'; // Fixed import
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Events from './pages/Events';
import Forms from './pages/Forms';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Add useEffect for auth persistence
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.username);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', {
      credentials: 'include'
    });
    setCurrentUser(null);
    setShowDropdown(false);
  };

  const PrivateRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/events" element={<Events />} />
		  <Route path="/forms" element={<Forms />} />
          <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile user={currentUser} /></PrivateRoute>} />
        </Routes>
      </main>
    </Router>
  );
  
}

export default App;