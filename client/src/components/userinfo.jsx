import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetchItems from '../components/pickdatabase';

const Userinfo = () => {
    const { user } = useFetchItems();
    const [inputUser, setInputUser] = useState(user.username || '');
    const [inputname, setInputname] = useState(user.fullname || '');
    const [inputPassword, setInputPassword] = useState('');
    const [inputGender, setInputGender] = useState(user.gender);
    const [inputEmail, setInputEmail] = useState(user.email || '');
    const [inputAddress, setInputAddress] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState('');
    const [mssg, setmssg] = useState('');
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        setInputUser(user.username || '');
        setInputname(user.fullname || '');
        setInputGender(user.gender || '');
        setInputEmail(user.email || '');
        setInputAddress(user.address || '');
        setSelectedCountry(user.country || '');
        setPhoneNumber(user.phoneNumber || '');
        setInputPassword(null);
        setState(user.state || 'N/A');
    
      }, [user]);

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
          } catch (error) {
            console.error('Error fetching countries:', error);
          }
        };
        fetchCountries();
    
      }, []);


      const handleCountryChange = async (event) => {
        setSelectedCountry(event.target.value);
      };
      const sortedCountries = countries.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
    
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUserData = {
          ...user,
          curruser: user.username,
          username: inputUser,
          fullname: inputname,
          gender: inputGender,
          email: inputEmail,
          pass: inputPassword,
          address: inputAddress,
          country: selectedCountry,
          state: state,
          phoneNumber: phoneNumber,
        };
    
        try {
          setmssg('Updating...')
          await axios.put(`${SERVER_URL}/user/update`, updatedUserData);
          console.log('User data updated successfully:');
          setmssg('Update was successful')
          if (updatedUserData.username !== loggedInUser) {
            localStorage.setItem("loggedInUser", updatedUserData.username)
          }
          window.location.reload()
        } catch (error) {
          console.error('Error updating user data:', error);
          setmssg(error.response.data.message)
        }
      };


  return (
    <div>
      <h2>User Information</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input placeholder='N/A' type="text" id="username" name="username" value={inputUser} onChange={(e) => setInputUser(e.target.value)} />
            <label htmlFor="fullname">Full Name:</label>
            <input placeholder='N/A' type="text" id="fullname" name="fullname" value={inputname} onChange={(e) => setInputname(e.target.value)} />
            <label htmlFor="email">Email:</label>
            <input placeholder='N/A' type="email" id="email" name="email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={inputGender} onChange={(e) => setInputGender(e.target.value)}>
              <option hidden value="">None</option>
              <option value={"Female"}>Female</option>
              <option value={"Male"}>Male</option>
              <option value={"Prefer not to say"}>Prefer not to say</option>
              <option value={"Other"}>Other</option>
            </select>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} placeholder="***********" />
            <label htmlFor="country">Country:</label>
            <select id="country" value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {sortedCountries.map((country) => (
                <option key={country.cca3} value={country.cca3}>{country.name.common}</option>
              ))}
            </select>
            <label htmlFor="state">State:</label>
            <input placeholder='N/A' type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
            <label htmlFor="address">Address:</label>
            <input placeholder='N/A' id="address" type={'text'} name="address" value={inputAddress} onChange={(e) => setInputAddress(e.target.value)} />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input placeholder='N/A' type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <button type="submit">Update</button>
            <small className='red'><b>{mssg}</b></small> <br />
          </form>
    </div>
  )
}

export default Userinfo
