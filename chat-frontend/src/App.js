import React, { useState, useEffect } from 'react'; // Fixed import
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Events from './pages/Events';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
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
      <nav className="navBar">
        <div className="navLinks">
          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink" to="/chat">Chat</Link>
          <Link className="navLink" to="/events">Events</Link>
          
          {currentUser ? (
            <div className="profileDropdown">
              <button onClick={() => setShowDropdown(!showDropdown)}>
                {currentUser} ▼
              </button>
              {showDropdown && (
                <div className="dropdownMenu">
                  <Link to="/profile">Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="navLink" to="/login">Login</Link>
              <Link className="navLink" to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
          <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile user={currentUser} /></PrivateRoute>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;