import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useFetchItems from '../components/pickdatabase';
import PaymentForm from '../components/payment';
import { FaCheck } from "react-icons/fa6";
import { FaCalendarCheck, FaTrashAlt } from "react-icons/fa";
import { Loading1, Error1, Not1 } from '../components/Loading';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

function Buy() {
  document.title = "Buyverse: Cart - Check Out";
  const loggedInUser = localStorage.getItem('loggedInUser');
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [isChecked, setChecked] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]); 
  const [paymentStatus, setPaymentStatus] = useState('');
  const { items, loading, error } = useFetchItems();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [passedData, setPassedData] = useState([])

  if (!loggedInUser) {
    window.location.href = '/login';
  }
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/cart/buy`, { params: { myusername: loggedInUser } });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    getCart();
  }, [loggedInUser]);


  const handleSelectChange = (e, itemId) => {
    setShowPaymentForm(false);
    const newQuantity = { ...quantity };
    newQuantity[itemId] = e.target.value;
    setQuantity(newQuantity);

    const updatedCheckoutItems = checkoutItems.map(item => {
      if (item.itemId === itemId) {
        return {
          ...item,
          quantity: parseInt(e.target.value)
        };
      }
      return item;
    });
    setCheckoutItems(updatedCheckoutItems);
  };

  const handleCancel = () => {
    setShowPaymentForm(false);
    setPassedData([]);
  };

  const removeContent = async (itemId) => {
    try {
      await axios.delete(`${SERVER_URL}/buy/remove`, { data: { itemId, username: loggedInUser } });
      const updatedCart = cartItems.cart.filter((item) => item.itemId !== itemId);
      setCartItems({ ...cartItems, cart: updatedCart });
      const updatedCheckoutItems = checkoutItems.filter((item) => item.itemId !== itemId);
      setCheckoutItems(updatedCheckoutItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckboxChange = (e, index) => {
    const newChecked = [...isChecked];
    newChecked[index] = e.target.checked;
    setChecked(newChecked);

    const selectedItem = cartItems.cart[index];
    if (e.target.checked) {
      const newCheckoutItem = {
        ...selectedItem,
        id: checkoutItems.length,
        price: (parseInt(items.find((product) => product.productId === selectedItem.itemId)?.productPrice) || 0),
        quantity: (parseInt(quantity[selectedItem.itemId]) || parseInt(selectedItem.selectedValue) || 1),
        shippingFee: (parseInt(items.find((product) => product.productId === selectedItem.itemId)?.shippingFee) || 0)
      };
      setCheckoutItems([...checkoutItems, newCheckoutItem]);
      setPaymentStatus(false)
      setShowPaymentForm(false);

    } else {
      const updatedCheckoutItems = checkoutItems.filter((item) => item.itemId !== selectedItem.itemId);
      setCheckoutItems(updatedCheckoutItems);
      setPaymentStatus(false)
      setShowPaymentForm(false);
    }
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    checkoutItems.forEach((item) => {
      const price = parseInt(item.price);
      const selectedQuantity = parseInt(item.quantity);
      const shippingFee = parseInt(item.shippingFee);
      const itemTotal = (price * selectedQuantity) + shippingFee;
      totalPrice += itemTotal;
    });
    return totalPrice.toLocaleString();
  };

  const handlePayment = (formData) => {
    setShowPaymentForm(false);
    setPaymentStatus(true)
    setPassedData([]);
  };

  const showPayment = () => {
    let purchaseId = '';
    for (let i = 0; i < 5; i++) {
      purchaseId += Math.floor(Math.random() * 100);
    }

    const updatedPassedData = checkoutItems.map((items) => ({
      itemId: items.itemId,
      price: items.price,
      quantity: items.quantity,
      purchaseId: purchaseId + Math.floor(Math.random() * 100000),
      status: 'Delivery in progress'
    }));
    setPassedData(prevPassedData => ([...prevPassedData, ...updatedPassedData]));

    setShowPaymentForm(true);
  };

  if (loading) {
    return (<Loading1/>);
  }

  if (error) {
    return (<Error1/>);
  }

  if (!items[0]) {
    return (<Not1/>);
  }

  return (
    <div className="cart-container">
      <p className='cart-header'>🛒 Cart Items</p>
      {cartItems && cartItems.cart && cartItems.cart.length > 0 ? (
        <ul className="cart-list">
          {cartItems.cart.map((item, index) => (
            <li className="cart-item" key={index}>
              <input
                type="checkbox"
                checked={isChecked[index] || false}
                onChange={(e) => handleCheckboxChange(e, index)}
              />
              <div className="cart-item-image">
                <img src={items.find((product) => product.productId === item?.itemId)?.productImg && items.find((product) => product.productId === item?.itemId)?.productImg[0] ? items.find((product) => product.productId === item?.itemId)?.productImg[0] : "https://cdn4.iconfinder.com/data/icons/storeage-box/100/DPid-ICONS-61-512.png"} alt="" />
              </div>
              <div className="cart-item-info">
                <h3><a href={`/items?item=${item?.itemId}`}>{items.find((product) => product.productId === item?.itemId)?.productName || 'Product Name Not Available'}</a></h3>
                <p>Category: <a href={`/search?query=${items.find((product) => product.productId === item?.itemId)?.productCategory}`}>{items.find((product) => product.productId === item?.itemId)?.productCategory || 'Category Not Available'}</a></p>
                <p>Sub Category: {items.find((product) => product.productId === item?.itemId)?.productSubCategory || 'Sub Category Not Available'}</p>
                <p>Brand: <a href={`/search?query=${items.find((product) => product.productId === item?.itemId)?.productBrand}`}>{items.find((product) => product.productId === item?.itemId)?.productBrand || 'Brand Not Available'}</a></p>
              </div>
              <div className="item-quantity">
                <select value={quantity[item.itemId] || item?.selectedValue} onChange={(e) => handleSelectChange(e, item.itemId)}>
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="product-q">
                <p>Price: {"₦" + (items.find((product) => product.productId === item?.itemId)?.productPrice || 'Price Not Available').toLocaleString()} x {quantity[item.itemId] || item?.selectedValue}</p>
                <p>Shipping: {(items.find((product) => product.productId === item?.itemId)?.shippingFee || "Free").toLocaleString()}</p>
                <p>Total: <b>{"₦" + (parseInt(items.find((product) => product.productId === item?.itemId)?.productPrice) * parseInt(quantity[item.itemId] || item?.selectedValue) + parseInt(items.find((product) => product.productId === item?.itemId)?.shippingFee || 0)).toLocaleString() || 0}</b></p>
              </div>
              <p className='trash-icon' onClick={() => removeContent(item.itemId)}><FaTrashAlt/></p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-cart-message-container">
          <div className="empty-cart-message-content">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart to get started.</p>
          </div>
        </div>
      )}
      {isChecked.includes(true) && (
        <div className="checkout-section">
          {showPaymentForm && <PaymentForm tot={"aa"} loggedInUser={loggedInUser} mysent={passedData} total={calculateTotal()} handlePayment={handlePayment} handleCancel={handleCancel} />}
          {!showPaymentForm && !paymentStatus && (
            <div>
              <h2 className='checkcolor'> <FaCalendarCheck className='checkcolor' /> Checkout</h2>
              <table className="checkout-table">
                <tbody>
                  {checkoutItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {items.find((product) => product.productId === item?.itemId)?.productName}
                      </td>
                      <td>
                        {"₦" + (items.find((product) => product.productId === item?.itemId)?.productPrice * (quantity[item.itemId] || item.selectedValue) + items.find((product) => product.productId === item?.itemId)?.shippingFee).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className='ltl'>
                  <tr>
                    <td>Total payment </td>
                    <td>₦{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>
              <br /><br />
              <button className="pay-btn" onClick={showPayment}>Pay Now</button>
            </div>
          )}
        </div>
      )}
      {paymentStatus && (
        <div className="payment-status">
          <div className="payment-container">
            <FaCheck className="payment-success-icon" />
            <h3>Payment Successful!</h3>
            <p>Your payment has been processed successfully. Thank you for your purchase.</p>
            <a href="/"><button className="continue-shopping-btn">Continue Shopping</button></a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Buy;
