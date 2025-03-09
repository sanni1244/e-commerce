import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Register = () => {
  document.title = "Buyverse: Register";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage({ message: 'Registration in progress...', type: 'loading' });

    try {
      const response = await axios.post(`${SERVER_URL}/register`, { username: username.toLowerCase(), password });
      console.log('Registration successful:', response.data);

      setStatusMessage({ message: 'Registration successful! Redirecting...', type: 'success' });
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setStatusMessage({ message: 'User already exists. Please try another username.', type: 'error' });
      } else {
        console.error('Registration failed:', error);
        setStatusMessage({ message: error.code === "ERR_NETWORK" ? 'Network error. Please check your connection.' : 'Something went wrong. Please try again.', type: 'error' });
      }
    }
  };

  return (
    <div className="logcont">
      <div className="card">
        <center><h2>Register</h2></center>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            minLength={4}
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            type="password"
            minLength={4}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {statusMessage.message && (
            <div className={`status-message ${statusMessage.type}`}>
              {statusMessage.message}
            </div>
          )}

          <br />
          <button className="button" type="submit">Register</button>
        </form>
        <br />
        <small><i>Already registered? <a href="/login">Login</a> </i></small>
      </div>
    </div>
  );
};

export default Register;
