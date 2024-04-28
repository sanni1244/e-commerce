import React, { useState } from 'react';
import { FaUser, FaHistory, FaCreditCard, FaCog } from 'react-icons/fa';
import Paydetails from '../components/paydetails';
import Settings from '../components/Settings';
import '../styles/profile.css';
import '../styles/userinfo.css';
import '../styles/settings.css';
import useFetchItems from '../components/pickdatabase';
import OrderDate from '../components/orderDate';
import Userinfo from '../components/userinfo';
const loggedInUser = localStorage.getItem('loggedInUser');

const Profile = () => {
  document.title = "Profile"
  const [activeSection, setActiveSection] = useState('user-info');
  const { loading, error } = useFetchItems();

  if (!loggedInUser) {
    window.location.href = '/login';
  }

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Oops! Something went wrong.</h2>
          <b>{error.code === "ERR_NETWORK" ? error.message : "Error while fetching data "}: Try again</b>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="left-nav">
        <ul>
          <li onClick={() => handleNavClick('user-info')}><FaUser /> User Information</li>
          <li onClick={() => handleNavClick('order-history')}><FaHistory /> Order History</li>
          <li onClick={() => handleNavClick('payment-info')}><FaCreditCard /> Payment Information</li>
          <li onClick={() => handleNavClick('settings')}><FaCog /> Settings</li>
        </ul>
      </div>

      <div className="main-content">
        <section id="user-info" className={activeSection === 'user-info' ? 'bsector active' : 'hidden'}>
          <Userinfo />
        </section>
        <section id="order-history" className={activeSection === 'order-history' ? ' bsector3 active' : 'hidden'}>
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
