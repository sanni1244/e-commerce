import React, { useState } from 'react';
import { FaUser, FaHistory, FaCreditCard, FaCog } from 'react-icons/fa';
import Paydetails from '../components/paydetails';
import Settings from '../components/Settings';
import useFetchItems from '../components/pickdatabase';
import OrderDate from '../components/orderDate';
import Userinfo from '../components/userinfo';
import { Loading1, Error1 } from '../components/Loading';

const loggedInUser = localStorage.getItem('loggedInUser');

const Profile = () => {
  document.title = "Buyverse: Profile";
  const [activeSection, setActiveSection] = useState('user-info');
  const { loading, error } = useFetchItems();

  if (!loggedInUser) {
    window.location.href = '/login';
  } 

  const handleNavClick = (section) => { 
    setActiveSection(section);
  };

  if (loading) {
    return (<Loading1/>);
  }

  if (error) {
    return (<Error1/> );
  }

  return (
    <div className="profile-container">
      <div className="left-nav">
        <ul>
          <li onClick={() => handleNavClick('user-info')}><b><FaUser /> </b>User Information</li>
          <li onClick={() => handleNavClick('order-history')}><b><FaHistory /> </b>Order History</li>
          <li onClick={() => handleNavClick('payment-info')}><b><FaCreditCard /></b> Payment Information</li>
          <li onClick={() => handleNavClick('settings')}><b><FaCog /> </b>Settings</li>
        </ul>
      </div>

      <div className="main-content">
        <section id="user-info" className={activeSection === 'user-info' ? 'bsector active' : 'hidden'}>
          <Userinfo />
        </section>
        <section id="order-history" className={activeSection === 'order-history' ? ' bsector active' : 'hidden'}>
          <OrderDate />
        </section>
        <section id="payment-info" className={activeSection === 'payment-info' ? 'bsector active' : 'hidden'}>
          <Paydetails />
        </section>
        <section id="settings" className={activeSection === 'settings' ? 'bsector active' : 'hidden'}>
          <Settings />
        </section>
      </div>
    </div>
  );
};

export default Profile;
