import React, { useState } from 'react';
import './contact.css'; // นำเข้าไฟล์ CSS สำหรับการสวยงาม

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      
      {/* ส่วนของไลน์ร้าน, ที่อยู่, เบอร์โทร */}
      <div className="contact-info">
        <p>Our Store:</p>
        <p>123 Main Street, City, Country</p>
        <p>Tel : 06-xxxx-xxxx</p>
        <p>Line ID : ClosetShop</p>
        <p>Facebook : ClosetShop</p>
      </div>
    </div>
  );
}

export default ContactPage;