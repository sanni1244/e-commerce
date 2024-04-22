import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <FaExclamationTriangle className="not-found-icon" />
        <h1 className="not-found-heading">404 Not Found</h1>
        <p className="not-found-text">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="not-found-link">Go back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;







































