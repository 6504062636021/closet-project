import React from "react";
import data from "./data"; // Import data from data.js
import "./products.css";

function Hoodie() {
  const handleAddToCart = (productName, price) => {
    alert(`Added ${productName} to cart!`);
    // ในตัวอย่างนี้เราจะแสดง Alert และส่งชื่อสินค้าและราคาไปให้ Context API
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="Topic">Hoodie</div>
      <div className="product row">
        {data.hoodies.map((product) => (
          <div key={product.id} className="product-container">
            <img
              src={product.img}
              style={{ width: "100%" }}
              alt={product.name}
            />
            <p>
              {product.name}
              <br />
              <b>${product.price.toFixed(2)}</b> {/* แก้เพื่อให้ราคาแสดงถูกต้อง */}
            </p>
            <button
              className="buttonadd"
              onClick={() => handleAddToCart(product.name, product.price)}
            >
              Add to cart <i className="fa fa-shopping-cart"></i>
            </button>
            <button className="buttonbuy">
              Buy now <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hoodie;
