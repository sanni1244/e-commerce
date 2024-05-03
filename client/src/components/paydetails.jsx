import React, { useState } from 'react';

const Paydetails = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cong, setCong] = useState('Please do not input any sensitive data. This is a demo project.');
 
    const handleSubmit1 = (event) => {
        event.preventDefault();
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        {setCong("Your details have been saved.")}
      };
      
  return (
    <div>
      <div className="payment-info">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit1}>
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                placeholder="XXXX XXXX XXXX XXXX"
              />
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                maxLength="5"
              />
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text" 
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength="3"
                placeholder="XXX"
              />
              <button className='vvdd' type="submit">Submit Payment</button>
            </form>
          </div>
          <b><small className='red'>{cong}</small></b>
    </div>
  )
}

export default Paydetails
