import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLongArrowAltRight, faArrowLeft, faArrowRight ,faBars, faCartShopping, faUser} from '@fortawesome/free-solid-svg-icons';
import Products from './Products';
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,RouterProvider,Route,Link,
// } from "react-router-dom";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isMouseOverImage, setIsMouseOverImage] = useState(false); // เพิ่มสถานะเพื่อตรวจสอบว่าเมาส์อยู่บนรูปหรือไม่
  const images = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg'];

  // ประกาศ state สำหรับแสดง/ซ่อนตะกร้าและโปรไฟล์
const [showCart, setShowCart] = useState(false);
const [showProfile, setShowProfile] = useState(false);

// เพิ่มฟังก์ชัน toggleCart และ toggleProfile
const toggleCart = () => setShowCart(!showCart);
const toggleProfile = () => setShowProfile(!showProfile);
  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleServices = () => setShowServices(!showServices);
  const toggleItems = () => setShowItems(!showItems);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isMouseOverImage) { // เมื่อเมาส์ไม่ได้อยู่บนรูป
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [isMouseOverImage]); // ระบุว่า useEffect ควรทำงานเมื่อ isMouseOverImage เปลี่ยนแปลง


  const updateImageIndex = (increment) => {
    setImageIndex((prevIndex) => {
      let newIndex = prevIndex + increment;
      if (newIndex < 0) newIndex = images.length - 1;
      else if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  };



  return (
    <div>

     <div className="wrapper">
      <nav>
        <input type="checkbox" id="show-search" checked={showSearch} onChange={toggleSearch} />
        <div className='logo'>ClosetShop</div>
        <div className="content">
             <ul className="links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#" className="desktop-link" onClick={toggleServices}>
              Product
              </a>
              <input type="checkbox" id="show-services" checked={showServices} onChange={toggleServices} />
              <label htmlFor="show-services">Product</label>
              <ul>
                <li>
                  <a href="#">Jean</a>
                </li>
                <li>
                  <a href="#">T-shirt</a>
                </li>
                <li>
                  <a href="#" className="desktop-link" onClick={toggleItems}>
                  Coat
                  </a>
                  <input type="checkbox" id="show-items" checked={showItems} onChange={toggleItems} />
                  <label htmlFor="show-items">moreitem</label>
                  <ul>
                    <li>
                      <a href="#">Sweater</a>
                    </li>
                    <li>
                      <a href="#">Hoodie</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </div>
        <label htmlFor="show-search" className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </label>
        <form action="#" className="search-box">
          <input type="text" placeholder="Type Something to Search..." required />
          <button type="submit" className="go-icon">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </button>
        </form>
        <label htmlFor="show-cart" className="cart-icon" onClick={toggleCart}>
    <FontAwesomeIcon icon={faCartShopping} />
  </label>
  <label htmlFor="show-profile" className="profile-icon" onClick={toggleProfile}>
    <FontAwesomeIcon icon={faUser} />
  </label>
      </nav> 
      
      </div> 
  
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div className="slidepic">
  <FontAwesomeIcon icon={faArrowLeft} className="button" id="prev" onClick={() => updateImageIndex(-1)} />
  <div
    className="image-container"
    onMouseEnter={() => setIsMouseOverImage(true)}
    onMouseLeave={() => setIsMouseOverImage(false)}
  >
    <div className="carousel" style={{ transform: `translate(-${imageIndex * 100}%)` }}>
      {images.map((image, index) => (
        <img key={index} src={image} alt="" />
      ))}
    </div>
  </div>
  <FontAwesomeIcon icon={faArrowRight} className="button" id="next" onClick={() => updateImageIndex(1)}  />
</div>


           <div> <Products /></div>   
      </div>
    
    </div>
  );
}

export default App;
