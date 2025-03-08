import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetchItems from '../components/pickdatabase';

const OrderDate = () => {
  const [orders, setOrders] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
  const { items } = useFetchItems();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const response = await axios.get(`${SERVER_URL}/order/history/${loggedInUser}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchOrderHistory();
  }, [items]);

  function formatDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} ${formattedHours}:${formattedMinutes} ${amOrPm}`;
  }

  const saveDate = (od, delTime) => {
    const orderDate = new Date(od);
    orderDate.setDate(orderDate.getDate() + delTime);
    return orderDate.toLocaleDateString();
  }
  
  const isPastDate = (deliveryDate) => {
    console.log(deliveryDate);
  
    if (!deliveryDate) {
      return false; // Handle cases where deliveryDate is null or undefined
    }
  
    const today = new Date();
    const delivery = new Date(deliveryDate); // Parse deliveryDate
  
    if (isNaN(delivery.getTime())) {
      return false; // Handle invalid date strings
    }
  
    // Set time components of both dates to 0 for accurate date-only comparison
    today.setHours(0, 0, 0, 0);
    delivery.setHours(0, 0, 0, 0);
  
    return delivery < today;
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Order History</h2>
      <table style={{ borderCollapse: 'collapse', minWidth: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Order ID</th>
            <th>Date & Time</th>
            <th>Qty</th>
            <th>Item ID</th>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody className='small-table'>
          {orders.length > 0 ? (
            orders.map(order => {
              const matchingItem = items.find(item => item.productId === order.itemId);
              if (!matchingItem) return null;
              const deliveryDate = saveDate(order.date, matchingItem.deliveryTime);
              const isPast = isPastDate(deliveryDate);
              return (
                <tr class={ isPast ? 'dlb-order' : null } key={order.purchaseId}>
                  <td>{order.purchaseId}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>{order.quantity}</td>
                  <td>{matchingItem.productId}</td>
                  <td>
                    <a href={`/items?item=${matchingItem.productId}`}>{matchingItem.productName}</a>
                  </td>
                  <td>₦{((order.price * order.quantity) + matchingItem.shippingFee).toLocaleString()}</td>
                  <td >{deliveryDate}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDate;
