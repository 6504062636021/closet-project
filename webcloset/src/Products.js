import React from 'react';
import data from './data'; // Import data from data.js
import './products.css'; // Import CSS for styling

function Products() {
  const handleAddToCart = (productName, price) => {
    alert(`Added ${productName} to cart!`);
    // ในตัวอย่างนี้เราจะแสดง Alert และส่งชื่อสินค้าและราคาไปให้ Context API
  };

  return (
    <div>
      <div >
        <h2>Jeans</h2>
        <div className="product row">
          {data.jeans.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product.name, product.price)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
              <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>T-Shirts</h2>
        <div className="product row">
          {data.tshirts.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product.name, product.price)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
              <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
            </div>
          ))}
        </div>
      </div>

      <div >
        <h2>Sweaters</h2>
        <div className="product row">
          {data.sweaters.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product.name, product.price)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
              <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Hoodies</h2>
        <div className="product row">
          {data.hoodies.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product.name, product.price)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
              <button className="buttonbuy">Buy now <i className="fa fa-shopping-cart"></i></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
