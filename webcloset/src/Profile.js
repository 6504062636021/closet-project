import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from './lib/axios.mjs';
import jscookie from 'js-cookie';
import swal from 'sweetalert2';

function Profile({setPage}) {
  const [customerData, setCustomerData] = useState({
    customerID: null,
    name: null,
    surname:null,
    address: null,
    tel: null
  });

  useEffect(() => {
    axios.get('auth/@me',{
      headers: {
        'Authorization' : 'Bearer ' + jscookie.get('token')
      }
    }).then((res) => {
      setCustomerData({
        customerID: res.data.user.id,
        name: res.data.user.name,
        surname: res.data.user.surname,
        address: res.data.user.address,
        tel: res.data.user.tel
      })
      // Setaccount(res.user)
    })
  },[])
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(customerData);

  const handleEdit = (e) => {
    setEditing(true);
    // setCustomerData(customerData);
    setFormData(customerData); // Reset form data to initial customer data
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => { 
     e.preventDefault();
    axios.patch('auth/' + customerData.customerID,new URLSearchParams({
      name: formData.name,
      surname: formData.surname,
      address: formData.address
    }).toString(),{
      headers: {
        'Authorization' : 'Bearer ' + jscookie.get('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      swal.fire({
        icon: 'success',
        title: 'Success',
        text: res.data.msg,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
      setEditing(false);
      })
      setCustomerData(formData);
    }).catch((e) => {
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data.msg,
        timer: 2000,
        showConfirmButton: false
      })
    })
  };

  const logout = () => {
    jscookie.remove('token')
    setPage('Login')

  }
  return (
    <div className="Profile2">
      {editing ? (
        <div className="profile">
          <h2 className="profile-title">Edit Profile</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="customerID" className="input-label">Customer ID:</label>
              <input type="text" id="customerID" name="customerID" value={formData.customerID} className="input-field bg-gray-100" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="bankAccount" className="input-label">Tel:</label>
              <input type="text" id="bankAccount" name="bankAccount" value={formData.tel} onChange={handleInputChange} className="input-field bg-gray-100" readOnly required />
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
          <textarea value={formData.address} rows={3} name="address" onChange={handleInputChange} className="block p-2.5 w-full text-sm text-gray-900 bg-[#fff] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Address..." required />
            </div>
            <div className="button-group mt-5">
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
              <span className="info-value"> {customerData.customerID}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value"> {customerData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Surname:</span>
              <span className="info-value"> {customerData.surname}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value"> {customerData.address}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tel:</span>
              <span className="info-value"> {customerData.tel}</span>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between'
          }}>
          <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
          <button className="edit-button" onClick={() => logout()}>Logout</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default Profile;