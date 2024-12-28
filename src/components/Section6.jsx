import React from 'react';
import './Section6.css';
// import logo1 from '../assets/partner1.png'; // Replace with actual image paths
// import logo2 from '../assets/partner2.png';
// import logo3 from '../assets/partner3.png';
// import logo4 from '../assets/partner4.png';
// import logo5 from '../assets/partner5.png';
import logo1 from '../assets/product-image.png'; // Replace with actual image paths
import logo2 from '../assets/product-image.png';
import logo3 from '../assets/product-image.png';
import logo4 from '../assets/product-image.png';
import logo5 from '../assets/product-image.png';

const Section6 = () => {
  return (
    <div className="partnership-section">
      <div className="partnership-content">
        <h2>Partnerships</h2>
        <p>
          We share values, peerless quality of service, and clarity of vision that includes cultural
          and linguistic ownership of sign by the Deaf community.
        </p>
        <div className="logos-container">
          <img src={logo1} alt="Partner 1" />
          <img src={logo2} alt="Partner 2" />
          <img src={logo3} alt="Partner 3" />
          <img src={logo4} alt="Partner 4" />
          <img src={logo5} alt="Partner 5" />
        </div>
        <a href="#become-partner" className="partner-btn">Become a partner</a>
      </div>
    </div>
  );
};

export default Section6;
