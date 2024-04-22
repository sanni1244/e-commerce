import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';


const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  animation: ${fadeIn} 0.5s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;


const Login = () => {
  document.title = "Login"
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage('Logging in.....');
      await axios.post(`${SERVER_URL}/login`, { username: username.toLowerCase(), password });

      setErrorMessage('Login was successful');
      setTimeout(() => {
        localStorage.setItem('loggedInUser', username.toLowerCase());
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      <b>{error.code === "ERR_NETWORK" ? setErrorMessage(error.message) : setErrorMessage('Invalid Details')}: Please try again</b> 
      
    }
  };


  return (
    <Container>
      <Card>
        <center><h2>Login</h2></center>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setErrorMessage('') }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setErrorMessage(''); setPassword(e.target.value) }}
          />
          {errorMessage && <center className='dfffa df2'>{errorMessage}</center>}
          <button className='button' type="submit">Login</button>
        </form>
        <br />
    <small><i>Dont have an account? <a href="/register">Sign up</a> </i></small>

      </Card>
    </Container>
  );
};

export default Login;
