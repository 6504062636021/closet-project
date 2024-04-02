import React, { useEffect, useState } from 'react';
import './payment.css';
import axios from './lib/axios.mjs';
import swal from 'sweetalert2'
import jscookie from 'js-cookie'

const PaymentPage = ({setPage}) => {
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCardDetails, setCreditCardDetails] = useState({ name: '', cardNumber: '', expiry: '', cvv: '' });
  const [paypalDetails, setPaypalDetails] = useState({ email: '', password: '' });
  const [price,setPrice] = useState(0);
  useEffect(() => {
   
    let a = 0;
    const getValue = JSON.parse(localStorage.getItem('cart'));
    setPrice(getValue.reduce((e,t,b) => e + (t.quantity * t.price),a))
  },[])
  // ลบตัวแปรที่ไม่ถูกใช้
  const [bankTransferDetails] = useState({ qrcode: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/products/buy',new URLSearchParams({
      product: localStorage.getItem('cart')
    }),{
      headers: {
        contentType: "application/x-www-form-urlencoded",
        Authorization: 'Bearer ' + jscookie.get('token') || ''
      }
    }).then((e) => {
      swal.fire({
          title: 'Success',
          text: e.data.msg,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
      }).then(() => {
        localStorage.removeItem('cart')
        setPage('Home')
        
      
      })
    }).catch((e) => {
      swal.fire({
          title: 'Error',
          text: 'Error',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500

      })
    })
    // // ตรวจสอบวิธีการชำระเงินและดำเนินการต่อไป
    // if (paymentMethod === 'creditDebit') {
    //   // ดำเนินการสำหรับ Credit/Debit Card
    //   console.log('Processing Credit/Debit Card payment...');
    //   console.log('Name on Card:', creditCardDetails.name);
    //   console.log('Card Number:', creditCardDetails.cardNumber);
    //   console.log('Expiry Date:', creditCardDetails.expiry);
    //   console.log('CVV:', creditCardDetails.cvv);
    // } else if (paymentMethod === 'paypal') {
    //   // ดำเนินการสำหรับ PayPal
    //   console.log('Processing PayPal payment...');
    //   console.log('Email:', paypalDetails.email);
    //   console.log('Password:', paypalDetails.password);
    // } else if (paymentMethod === 'bankTransfer') {
    //   // ดำเนินการสำหรับ Bank Transfer
    //   console.log('Processing Bank Transfer payment...');
    //   console.log('QR Code:', bankTransferDetails.qrcode);
    // } else {
    //   setError('Please select a payment method');
    // }
  };

  const handleCreditDebitClick = () => {
    // เลือกวิธีการชำระเงินเป็น Credit/Debit Card
    setPaymentMethod('creditDebit');
  };

  const handlePayPalClick = () => {
    // เลือกวิธีการชำระเงินเป็น PayPal
    setPaymentMethod('paypal');
  };

  const handleBankTransferClick = () => {
    // เลือกวิธีการชำระเงินเป็น Bank Transfer
    setPaymentMethod('bankTransfer');
  };

  return (
    <div>
      <header>
        <h1>ClosetShop</h1>
      </header>
      <div className=" mt-24 mb-24 h-[100vh]">
        <div className="payment-form ">
          <h2 className="font-bold text-2xl mb-2">Payment Details</h2>
          <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center' }}>
                <img src="/images/qrcode.jpg" alt="Credit/debit Card logo" className='w-[65%] text-center mx-auto mb-5' />
              </div>
              <div>
                <h5><span className="font-bold">Total:</span> {price.toFixed(2)}$</h5>
              </div>
            <button type="submit" className="mt-12">Pay Now</button>
          </form>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>
      <footer className="mt-[100px]">
        <p>&copy; 2024 Clothing Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentPage;
