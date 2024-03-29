import React from 'react';
import './products.css';

function Products() {
  const handleAddToCart = (productName, price) => {
    alert(`Added ${productName} to cart!`);
    // ในตัวอย่างนี้เราจะแสดง Alert และส่งชื่อสินค้าและราคาไปให้ Context API
  };
  return (
    <div className="product row">
      <div className="product-container">
        <img src="/images/p1.webp" style={{ width: '100%' }} alt="Relaxed Jean" />
        <p>Relaxed Jean<br /><b>$24.99</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Relaxed Jean', 24.99)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/p2.jpg" style={{ width: '100%' }} alt="Mega Ripped Jeans" />
        <p>Mega Ripped Jeans<br /><b>$19.99</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Mega Ripped Jeans', 19.99)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/p3.webp" style={{ width: '100%' }} alt="Washed Skinny Jeans" />
        <p>Washed Skinny Jeans<br /><b>$20.50</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Washed Skinny Jeans',20.50)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sh1.jpg" style={{ width: '100%' }} alt="Blue T-shirt" />
        <p>Blue T-shirt <br /><b>$20</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Blue T-shirt',20)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sh2.jpg" style={{ width: '100%' }} alt="Pink T-shirt" />
        <p>Pink T-shirt<br /><b>$20</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Pink T-shirt',20)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sh3.jpg" style={{ width: '100%' }} alt="Black T-shirt" />
        <p>Black T-shirt<br /><b>$20</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Black T-shirt',20)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sh4.jpg" style={{ width: '100%' }} alt="White T-shirt" />
        <p>White T-shirt<br /><b>$20</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('White T-shirt',20)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sweater1.jpg" style={{ width: '100%' }} alt="Red Sweater" />
        <p>Red Sweater<br /><b>$32</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Red Sweater',32)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sweater2.jpg" style={{ width: '100%' }} alt="Yellow Sweater" />
        <p>Yellow Sweater<br /><b>$32</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Yellow Sweater',32)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sweater3.jpg" style={{ width: '100%' }} alt="Green Sweater" />
        <p>Green Sweater<br /><b>$32</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Green Sweater',32)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      <div className="product-container">
        <img src="/images/sweater4.jpg" style={{ width: '100%' }} alt="Plaid Sweater" />
        <p>Plaid Sweater<br /><b>$32</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Plaid Sweater',32)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>

      <div className="product-container">
        <img src="/images/ho1.webp" style={{ width: '100%' }} alt="Pink Hoodie" />
        <p>Pink Hoodie<br /><b>$30</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Pink Hoodie',30)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>

      <div className="product-container">
        <img src="/images/ho2.jpg" style={{ width: '100%' }} alt="Green Hoodie" />
        <p>Green Hoodie<br /><b>$30</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Green Hoodie',30)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
    
      
      <div className="product-container">
        <img src="/images/ho3.jpg" style={{ width: '100%' }} alt="Navy Blue Hoodie" />
        <p>Navy Blue Hoodie<br /><b>$30</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Navy Blue Hoodie',30)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>
      
      <div className="product-container">
        <img src="/images/ho4.jpg" style={{ width: '100%' }} alt="Dark green Hoodie" />
        <p>Dark green Hoodie<br /><b>$30</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Dark green Hoodie',30)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>

      <div className="product-container">
        <img src="/images/ho5.jpg" style={{ width: '100%' }} alt="Black Hoodie" />
        <p>Black Hoodie<br /><b>$30</b></p>
        <button className="buttonadd" onClick={() => handleAddToCart('Black Hoodie',30)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
        <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
      </div>

    </div>
  );
}

export default Products;
