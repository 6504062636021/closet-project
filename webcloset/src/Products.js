import React, { useEffect, useState } from 'react';
// import data from './data'; // Import data from data.js
import './products.css'; // Import CSS for styling
import axios from './lib/axios.mjs';
import jscookie from 'js-cookie';

function Products() {
  const [data, setData] = useState(null)
  useEffect(() => {
    axios.get('/products',{
      headers: {
        'Authorization' : 'Bearer ' + jscookie.get('token')
      }
    }).then((res) => {
      let result = res.data?.data;
      let category = []
      result = result?.map((item) => {
        if(typeof category[item?.category] == 'undefined')
        category[item.category] = []
        category[item.category].push({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          img: process.env.REACT_APP_API_URL + 'img_product/' + item.image
          
        })
        return category;
      })
      setData(result?.reverse()[0])
    })
  },[])
  const handleAddToCart = (product) => {
    let pData = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [];
    if(pData.filter((item) => item.id === product.id).length > 0){
      pData.filter((item) => {
        item.id === product.id ? item.quantity += 1 : item.quantity = item.quantity;
      })
      window.localStorage.setItem('cart', JSON.stringify(pData));
      alert(`เพิ่มจำนวนสินค้า ${product.name} ในตะกร้าแล้ว! จำนวน ${pData.find((e) => e.id == product.id).quantity} ชิ้น`);
      return;
    } else {
      pData.push({
        ...product,
        quantity: 1
      });
    }
    window.localStorage.setItem('cart', JSON.stringify(pData));
    alert(`เพิ่มสินค้า ${product.name} ในตะกร้าแล้ว! จำนวน 1 ชิ้น`);
    // ในตัวอย่างนี้เราจะแสดง Alert และส่งชื่อสินค้าและราคาไปให้ Context API
  };


  
  return (
    <div>
      <div >
        <h2 style={{fontSize:'50px'}}>Jeans</h2>
        <div className="product row">
          {data?.jeans?.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
  
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{fontSize:'50px'}}>T-Shirts</h2>
        <div className="product row">
          {data?.tshirts?.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
      
            </div>
          ))}
        </div>
      </div>

      <div >
        <h2 style={{fontSize:'50px'}}>Sweaters</h2>
        <div className="product row">
          {data?.sweaters?.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product)}>Add to cart <i className="fa fa-shopping-cart"></i></button>
          
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Hoodies</h2>
        <div className="product row">
          {data?.hoodies?.map((product) => (
            <div key={product.id} className="product-container">
              <img src={product.img} style={{ width: '100%' }} alt={product.name} />
              <p>{product.name}<br /><b>${product.price.toFixed(2)}</b></p>
              <button className="buttonadd" onClick={() => handleAddToCart(product.name, product.price)}>Add to cart <i className="fa fa-shopping-cart"></i></button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
