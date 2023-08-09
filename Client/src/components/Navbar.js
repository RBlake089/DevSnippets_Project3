import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import '../styles.css'; // Import the styles.css file
import Auth from '../utils/auth';

const Navbar = () => {
  const handleLogout = () => {
    Auth.logout(); // Remove the JWT token from local storage
    window.location.replace('/'); // Redirect the user to the homepage or login page
  };


  return (
    <nav className="navbar">
      <div className="logo">
        <a href="https://github.com/Kviponder/DevSnippets" target="_blank" rel="noopener noreferrer">
          DevSnippets
        </a>
        <hr/>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {Auth.loggedIn() ? (
          <>
            <li>
              <Link to="/snippets" className="nav-link">My Snippets</Link>
            </li>
            {/* Show logout button if user is logged in */}
            <li>
              <Button variant="gold" className="nav-link" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            {/* Show login and signup links if user is not logged in */}
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
