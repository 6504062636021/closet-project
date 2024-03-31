import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [customerData, setCustomerData] = useState({
    customerID: '1234567890',
    name: 'John',
    surname: 'Doe',
    address: '123 Main Street',
    bankAccount: '1234567890'
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(customerData);

  const handleEdit = () => {
    setEditing(true);
    setFormData(customerData); // Reset form data to initial customer data
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setCustomerData(formData);
    setEditing(false);
  };

  return (
    <div className="Profile2">
      {editing ? (
        <div className="profile">
          <h2 className="profile-title">Edit Profile</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="form-group">
              <label htmlFor="customerID" className="input-label">Customer ID:</label>
              <input type="text" id="customerID" name="customerID" value={formData.customerID} className="input-field" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="input-label">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="input-field" required />
            </div>
            <div className="form-group">
              <label htmlFor="surname" className="input-label">Surname:</label>
              <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} className="input-field" required />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="input-label">Address:</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="input-field" required />
            </div>
            <div className="form-group">
              <label htmlFor="bankAccount" className="input-label">Bank Account:</label>
              <input type="text" id="bankAccount" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} className="input-field" required />
            </div>
            <div className="button-group">
              <button type="submit" className="confirm-button">Confirm</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile">
          <h2 className="profile-title">Profile</h2>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Customer ID:</span>
              <span className="info-value">{customerData.customerID}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{customerData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Surname:</span>
              <span className="info-value">{customerData.surname}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value">{customerData.address}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Bank Account:</span>
              <span className="info-value">{customerData.bankAccount}</span>
            </div>
          </div>
          <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;