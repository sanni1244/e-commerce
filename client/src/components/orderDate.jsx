import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableBody, Paper } from '@mui/material';
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
  
  return (
    <div>
      <div>
            <h2 className='class-header'> Order History</h2>
            <Paper className='tablestyle' sx={{ maxWidth: '100%', overflowX: 'auto', marginBottom: '20px' }}>
              <Table>
                <TableHead>
                  <tr>
                    <td>Order ID</td>
                    <td>Date & Time</td>
                    <td>Quantity</td>
                    <td>Item ID</td>
                    <td>Product Name</td>
                    <td>Amount paid (Naira)</td>
                    <td>Delivery Date</td>
                  </tr>
                </TableHead>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.purchaseId}>
                        {items.map((item) => (
                          item.productId === order.itemId ? (
                            <>
                              <td>{order.purchaseId}</td>
                              <td>{formatDate(order.date)}</td>
                              <td>{order.quantity}</td>
                              <td key={item.productId}>{item.productId}</td>
                              <td className='width-extra'>
                                <a href={`/items?item=${item.productId}`}>{item.productName}</a>
                              </td>
                              <td className='realmoney'>
                                {(order.price * order.quantity) + item.shippingFee}
                              </td>
                              <td>{saveDate(order.date, item.deliveryTime)}</td>
                            </>
                          ) : null
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <TableCell colSpan="8">No orders found</TableCell>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
    </div>
  )
}

export default OrderDate
