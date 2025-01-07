import React from 'react';
import './Section5.css';
import accessibilityImage from '../assets/sign-image.png'; // Replace with correct image path

const Section5 = () => {
  return (
    <div className="accessibility-section">
      <div className="accessibility-content">
        <div className="text-column">
          <h2>Enhance your business's <span>accessibility</span></h2>
          <p>
            Empower Deaf people with our cutting-edge AI Pakistan sign language translation.
            <br/>
            <br/>
            Perfect to <span class="highlighted">expand your reach</span> by giving them an opportunity to interact freely, 
            our technology <span class="highlighted">ensures accurate and engaging communication</span> that makes a meaningful impact.
          </p>
          
          <a href="#learn-more" className="learn-more-btn">Read & learn</a>
        </div>
        <div className="image-column">
          <img src={accessibilityImage} alt="Accessibility" />
        </div>
      </div>
    </div>
  );
};

export default Section5;
