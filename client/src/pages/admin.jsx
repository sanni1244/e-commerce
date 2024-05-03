import React from 'react';
import { Link } from 'react-router-dom';
const Admin = () => {
  document.title = "Admin"
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser !== "admin") {
    window.location.href = "/";
  }
  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Activities</h1>
      <div className="admin-activities">
        <div className="admin-activity">
          <h2 className="activity-title">Create</h2>
          <p className="activity-description">Add new products to the inventory.</p>
          <Link to={'/create'} className="activity-link">Go to Create</Link>
        </div>
        <div className="admin-activity">
          <h2 className="activity-title">Edit</h2>
          <p className="activity-description">Modify existing product in the inventory.</p>
          <Link to={'/edit'} className="activity-link">Go to Edit</Link>
        </div>
        <div className="admin-activity">
          <h2 className="activity-title">Delete</h2>
          <p className="activity-description">Remove product from the inventory.</p>
          <Link to={'/delete'} className="activity-link">Go to Delete</Link>
        </div>
        <div className="admin-activity">
          <h2 className="activity-title">Display</h2>
          <p className="activity-description">Display all products from the inventory.</p>
          <Link to={'/display'} className="activity-link">Go to Display</Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;
