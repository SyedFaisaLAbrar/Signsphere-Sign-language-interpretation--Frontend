import React from 'react';
import './Section1.css';
// import heroImage from '../assets/hero-image.png'; // Replace with actual image path
import productImage from '../assets/product-image-2.png'; // Replace with product UI image
import InterIcon from '../assets/tap.png'; // Replace with product UI image

const Section1 = () => {
  return (
    <div className="hero-section">
      {/* Content Section */}
      <div className="hero-content">
        <div className="row">
          <h1>Empowering Inclusivity</h1>
          <a href="/interpreter" className="hero-button">
            <span>Use Interpreter</span>
            <span className="icon">
              <img  src={InterIcon} alt="Tap Icon" />
            </span>
          </a>
        </div>
        <p className="hero-description">
          Providing equal tourism opportunities to deaf and speechless individuals.
        </p>
      </div>
      {/* Background Image */}
      <img src={productImage} alt="Background" className="hero-bg" />
    </div>
  );
  
  
  
};

export default Section1;
