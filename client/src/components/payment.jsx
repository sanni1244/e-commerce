import axios from 'axios';
import React, { useState } from 'react';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

function PaymentForm({ mysent, total, handlePayment, handleCancel }) {
  const loggedInUser = localStorage.getItem('loggedInUser');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mysent)
    handlePayment(formData);

    

    try {
      await axios.post(`${SERVER_URL}/purchase/add`, { mysent, loggedInUser });
      console.log('Items purchased successfully');
    } catch (error) {
      console.error('Error purchasing items:', error);
    }
  };

  const handleCancelClick = () => {
    handleCancel();
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Details</h2>
      <p>Total Amount: ₦{total}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div style={{display: "flex", gap: "3rem"}} className="">
          <button className='bttn'  type="submit">Pay Now</button>
          <button className='remove-btn' type="button" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
