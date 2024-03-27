import React from 'react';

function Products() {
  return (
    <div className="product row">
      <div className="w3-col l3 s6">
        <div className="product-container">
          <img src="/images/p1.webp" style={{ width: '100%' }} alt="Ripped Skinny Jeans" />
          <p>Ripped Skinny Jeans<br /><b>$24.99</b></p>
          <button className="w3-button w3-black buy-btn">Buy now <i className="fa fa-shopping-cart"></i></button>
        </div>
      </div>
      <div className="w3-col l3 s6">
        <div className="product-container">
          <img src="/images/p2.jpg" style={{ width: '100%' }} alt="Mega Ripped Jeans" />
          <p>Mega Ripped Jeans<br /><b>$19.99</b></p>
          <button className="w3-button w3-black buy-btn">Buy now <i className="fa fa-shopping-cart"></i></button>
        </div>
      </div>
      <div className="w3-col l3 s6">
        <div className="product-container">
          <img src="/images/p3.webp" style={{ width: '100%' }} alt="Washed Skinny Jeans" />
          <p>Washed Skinny Jeans<br /><b>$20.50</b></p>
          <button className="w3-button w3-black buy-btn">Buy now <i className="fa fa-shopping-cart"></i></button>
        </div>
      </div>
      {/* Add more product grid items here */}
    </div>
  );
}

export default Products;
