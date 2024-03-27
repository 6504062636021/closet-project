import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLongArrowAltRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isMouseOverImage, setIsMouseOverImage] = useState(false); // เพิ่มสถานะเพื่อตรวจสอบว่าเมาส์อยู่บนรูปหรือไม่
  const images = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg'];

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleMenu = () => setShowMenu(!showMenu);
  const toggleFeatures = () => setShowFeatures(!showFeatures);
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

    <div className="wrapper">
      <nav>
        <input type="checkbox" id="show-search" checked={showSearch} onChange={toggleSearch} />
        <input type="checkbox" id="show-menu" checked={showMenu} onChange={toggleMenu} />
        <label htmlFor="show-menu" className="menu-icon">
          <FontAwesomeIcon icon={faArrowLeft} />
        </label>
        <div className="content">
          <div className="logo">
            <a href="#">ClosetShop</a>
          </div>
          <ul className="links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#" className="desktop-link" onClick={toggleFeatures}>
                Features
              </a>
              <input type="checkbox" id="show-features" checked={showFeatures} onChange={toggleFeatures} />
              <label htmlFor="show-features">Features</label>
              <ul>
                <li>
                  <a href="#">Drop Menu 1</a>
                </li>
                <li>
                  <a href="#">Drop Menu 2</a>
                </li>
                <li>
                  <a href="#">Drop Menu 3</a>
                </li>
                <li>
                  <a href="#">Drop Menu 4</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="desktop-link" onClick={toggleServices}>
                Services
              </a>
              <input type="checkbox" id="show-services" checked={showServices} onChange={toggleServices} />
              <label htmlFor="show-services">Services</label>
              <ul>
                <li>
                  <a href="#">Drop Menu 1</a>
                </li>
                <li>
                  <a href="#">Drop Menu 2</a>
                </li>
                <li>
                  <a href="#">Drop Menu 3</a>
                </li>
                <li>
                  <a href="#" className="desktop-link" onClick={toggleItems}>
                    More Items
                  </a>
                  <input type="checkbox" id="show-items" checked={showItems} onChange={toggleItems} />
                  <label htmlFor="show-items">More Items</label>
                  <ul>
                    <li>
                      <a href="#">Sub Menu 1</a>
                    </li>
                    <li>
                      <a href="#">Sub Menu 2</a>
                    </li>
                    <li>
                      <a href="#">Sub Menu 3</a>
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
      </nav>
      <section className="wrapperpic">
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

      </section>
    </div>
  );
}

export default App;
