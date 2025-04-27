import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home    from './pages/Home';
import Chat    from './pages/Chat';
import Events  from './pages/Events';
import Forms   from './pages/Forms';
import Profile from './pages/Profile';

import Login    from './components/Login';
import Register from './components/Register';
import NavBar   from './components/NavBar';

import { AuthProvider, useAuth } from './contexts/AuthContext';


import './App.css';

function PrivateRoute({ children }) {
  const { username } = useAuth();
  return username
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* protected */}
            <Route path="/chat"    element={<PrivateRoute><Chat/></PrivateRoute>} />
            <Route path="/events"  element={<PrivateRoute><Events/></PrivateRoute>} />
            <Route path="/forms"   element={<PrivateRoute><Forms/></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />

            {/* public */}
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
