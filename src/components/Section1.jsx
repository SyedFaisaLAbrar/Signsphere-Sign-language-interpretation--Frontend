import React from 'react';
import './Section1.css';
// import heroImage from '../assets/hero-image.png'; // Replace with actual image path
import productImage from '../assets/product-image.png'; // Replace with product UI image

const Section1 = () => {
  return (
    <div className="hero-section">
      {/* Background Section */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>Impowering the inclusivity</h1>
          <p>
            Providing equal tourism opportunity to deaf<br/>
            and Speechless individuals.
          </p>
          
          <a
              href="/interpreter"
              className="flex items-center bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 relative"
            >
              <span>Use Interpreter</span>
              
              <span className="flex items-center justify-center bg-white text-blue-500 w-8 h-8 rounded-full shadow-inner ml-3">
                
                <img src="../assets/tap.png"
                  alt=""
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                />
                  
              </span>
              
            </a>
        </div>
        <div className="hero-image">
          {/* <img src={heroImage} alt="Product Preview" /> */}
        </div>
      </div>
      {/* Background Image */}
      <img src={productImage} alt="Background" className="hero-bg" />
    </div>
  );
};

export default Section1;
