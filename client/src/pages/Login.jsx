import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Login = () => {
  document.title = "Buyverse: Login";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // Use 'message' for all feedback

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ text: 'Authenticating...', type: 'info' }); // More professional message
    try {
      await axios.post(`${SERVER_URL}/login`, { username: username.toLowerCase(), password });

      setMessage({ text: 'Login successful. Redirecting...', type: 'success' }); // Clearer success message

      localStorage.setItem('loggedInUser', username.toLowerCase());
      setTimeout(() => {
        window.location.href = "/";
      }, 1500); // Slightly longer delay for smoother transition
    } catch (error) {
      console.error('Error logging in:', error);
      let errorMessage = 'An error occurred. Please try again.'; // Default error message

      if (error.code === "ERR_NETWORK") {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.response && error.response.status === 401) {
        errorMessage = 'Invalid credentials. Please try again.'; // Specific 401 message
      }

      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="logcont">
      <div className="card">
        <center><h2>Login</h2></center>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setMessage(null); }} // Clear message on input change
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setMessage(null); }} // Clear message on input change
          /><br />
          {message && (
            <center className={`message ${message.type}`}>
              {message.text}
            </center>
          )}
          <br />
          <button className='button' type="submit">Login</button>
        </form>
        <br />
        <small><i>Don't have an account? <a href="/register">Sign up</a></i></small>
      </div>
    </div>
  );
};

export default Login;