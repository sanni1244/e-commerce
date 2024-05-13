import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Register = () => {
  document.title = "Register";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage('Registration in progress....');
      const response = await axios.post(`${SERVER_URL}/register`, { username: username.toLowerCase(), password });
      console.log('Registration successful:', response.data);
      setErrorMessage('Registration successful');
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('User already exists');
      } else {
        console.error('Registration failed:', error);
        setErrorMessage(error.code === "ERR_NETWORK" ? error.message : 'Something went wrong. Please try again');
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
