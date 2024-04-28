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


const Register = () => {
  document.title = "Register"
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      setErrorMessage('Registeration in progress....');
      const response = await axios.post(`${SERVER_URL}/register`, { username: username.toLowerCase(), password });
      console.log('Registration successful:', response.data);
      setErrorMessage('Registeration successful');
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('User already exists');
      } else {
        console.error('Registration failed:', error);
        <b>{error.code === "ERR_NETWORK" ? setErrorMessage(error.message) : setErrorMessage('Something went wrong')}: Please try again</b>
      }
    }

  };

  return (
    <Container>
      <Card>
        <center><h2>Register</h2></center>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            min={4}
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            min={4}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <center className='dfffa df2'>{errorMessage}</center>}
          <br />
          <button className='button lgb1' type="submit">Register</button>
        </form>
        <br />
        <small><i>Already registered? <a href="/login">Login</a> </i></small>
      </Card>
    </Container>
  );
};

export default Register;
 