import React, { useState } from 'react';
import './cart.css'; // Import CSS file for styling
import data from './data'; // Import data from data.js

// สร้าง Component ของสินค้าแต่ละชิ้น
function CartItem({ id, name, price, image, quantity, removeItem, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="cart-item">
      <div className="item-info">
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
        <img src="trash-icon.png" alt="Remove" className="trash-icon" />
      </button>
    </div>
  );
}

// สร้าง Component ของตะกร้าสินค้า
function Cart() {
  // ใช้ useState เพื่อเก็บข้อมูลของสินค้าในตะกร้าและฟังก์ชันสำหรับการลบสินค้า
  const [cartItems, setCartItems] = useState(data.productsData.map(product => ({
    ...product,
    quantity: 1 // กำหนดจำนวนสินค้าในตะกร้าเริ่มต้นเป็น 1
  })));

  // ฟังก์ชันสำหรับการลบสินค้าออกจากตะกร้า
  const removeItem = id => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // ฟังก์ชันสำหรับการเพิ่มจำนวนสินค้า
  const increaseQuantity = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // ฟังก์ชันสำหรับการลดจำนวนสินค้า
  const decreaseQuantity = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  // คำนวณราคารวมของสินค้าทั้งหมดในตะกร้า
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
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
      <div className="total">Total: ${total.toFixed(2)}</div>
    </div>
  );
}

export default Cart;
