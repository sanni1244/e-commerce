import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51PCVaeGiJpve5KVb9WgJBew3prfPtf62WdOznNvDSF59HhcjSa8ed19JIZubxu6z8tcjPlF08BLHmKnOPI67PJwB00AujiRKNH");

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

function PaymentForm({ mysent, total, handlePayment, handleCancel }) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [loading, setLoading] = useState(false);
console.log({loggedInUser});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  console.log({ mysent });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when Pay Now button is clicked
    handlePayment(formData);

    setTimeout(() => {
      setLoading(false); // Set loading to false after 5 seconds
    }, 5000);

    try {
      await axios.post(`${SERVER_URL}/purchase/add`, { mysent, loggedInUser });
      console.log('Items purchased successfully');
    
      // Remove each item from the cart after purchase
      for (let item of mysent) {
        await axios.post(`${SERVER_URL}/cart/remove1`, { myusername: loggedInUser, itemId: item.itemId });
        console.log(`Removed item: ${item.itemId}`);
      }
    
      console.log('All items removed from cart');
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
        <div className="form-group">
          <label>Card Details:</label>
          <CardElement />
        </div>
        <div className="form-group">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <button className='' type="submit">Pay Now</button>
              <button style={{ marginLeft: "3rem" }} className="pay-btn" onClick={handleCancelClick}>Cancel</button>

            </>
          )}
        </div>
      </form>
    </div>
  );
}

function PaymentFormWithElements(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
}

export default PaymentFormWithElements;
