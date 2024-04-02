import React, { useState, useEffect } from 'react';
import Products from './Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [imageIndex, setImageIndex] = useState(0);
    const [isMouseOverImage, setIsMouseOverImage] = useState(false); // เพิ่มสถานะเพื่อตรวจสอบว่าเมาส์อยู่บนรูปหรือไม่
    const images = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg'];

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
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            {/* <div className="slidepic">
                <FontAwesomeIcon icon={faArrowLeft} className="button" id="prev" onClick={() => updateImageIndex(-1)} />
                <div className="image-container" onMouseEnter={() => setIsMouseOverImage(true)} onMouseLeave={() => setIsMouseOverImage(false)}>
                <div className="carousel" style={{ transform: `translate(-${imageIndex * 100}%)` }}>
                {images.map((image, index) => (<img className="w-full" key={index} src={image} alt={image} />))}
                </div>
                </div>
            <FontAwesomeIcon icon={faArrowRight} className="button" id="next" onClick={() => updateImageIndex(1)}  />
            </div> */}

<div className="carousel w-[50%] mt-[130px]">

{images.map((image, index) => (
  <>
  <div id={`slide_${index}`} className="carousel-item relative w-full">
    <img src={image} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href={`#slide_${index-1}`} className="btn btn-circle">❮</a> 
      <a href={`#slide_${index+1}`} className="btn btn-circle">❯</a>
    </div>
  </div> 
  </>
))}

  
</div>
        <div> 
          <Products />
          </div>   
    
    </div>

    );
}

export default Home;