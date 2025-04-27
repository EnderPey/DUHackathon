// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Events from './pages/Events';
import Forms from './pages/Forms';
import './App.css'; // Import global styles

const PrivateRoute = ({ children }) => {
	return currentUser ? children : <Navigate to="/login" />;
};


useEffect(() => {
	const checkAuth = async () => {
	  const response = await fetch('/api/check-auth', {
		credentials: 'include'
	  });
	  
	  if (response.ok) {
		const data = await response.json();
		setCurrentUser(data.username);
	  }
	};
	checkAuth();
}, []);

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navBar">
        <div className="navLinks">
          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink" to="/chat">Chat</Link>
          <Link className="navLink" to="/events">Events</Link>
          <Link className="navLink" to="/forms">Forms</Link>
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
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/events" element={<Events />} />
		  <Route path="/forms" element={<Forms />} />
		  <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </main>
    </Router>
  );
}



export default App;