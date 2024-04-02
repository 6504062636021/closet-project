import React, { useEffect, useState } from 'react';
import './cart.css'; // Import corrected CSS file for styling
import data from './data'; // Import data from data.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import jscookie from 'js-cookie'
import Swal from 'sweetalert2';

// Create a component for each cart item
function CartItem({ id, name, price, image, quantity, removeItem, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="grid-4" style={{marginTop: '10px',marginBottom:'10px'}}>
      <div className="col-span-3 flex">
        <img src={image} alt={name} className="item-image" />
        <div className="item-details">
          <span className="item-name">{name}</span>
          <span>${price.toFixed(2)}</span>
        </div>
      </div>
      <div className="quantity-controls">
        <button onClick={() => decreaseQuantity(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increaseQuantity(id)}>+</button>
      </div>
      <button onClick={() => removeItem(id)} className="remove-button">
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
}

// Create a component for the cart
function Cart({setPage}) {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const increaseQuantity = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const decreaseQuantity = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      setCartItems(cart);
    }
  },[])

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length == 0 ? (
        <>
        <h4 style={{textAlign: 'center'}}>
          ไม่มีสินค้าในกระตร้า
        </h4>
        </>
      ) :  cartItems.map(item => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          image={item.img}
          quantity={item.quantity}
          removeItem={removeItem}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}
      <div className="flex gap-2 justify-between">
          
      <div className="total">Total: ${total.toFixed(2)}</div>
      
      <div> 
      {cartItems.length > 0 ? (<>
        <button onClick={() => {
          if(jscookie.get('token'))
            return setPage('Payment')
          return Swal.fire({
            title: "Warning",
            icon: "warning",
            timer: 2000,
            showConfirmButton: false,
            text: "กรุณาทำการเข้าสู่ระบบ"
          })
        }} className="btn btn-sm">ชำระเงิน</button>
        </>) : <></>}
      </div>
      </div>
    </div>
  );
}

export default Cart;