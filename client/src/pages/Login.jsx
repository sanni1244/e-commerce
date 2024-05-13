import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Login = () => {
  document.title = "Login";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage('Logging in.....');
      await axios.post(`${SERVER_URL}/login`, { username: username.toLowerCase(), password });

      setErrorMessage('Login was successful');

      localStorage.setItem('loggedInUser', username.toLowerCase());
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(error.code === "ERR_NETWORK" ? error.message : 'Invalid Details: Please try again');
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
            onChange={(e) => { setUsername(e.target.value); setErrorMessage('') }}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
          /><br />
          {errorMessage && <center className='error-message'>{errorMessage}</center>}
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
