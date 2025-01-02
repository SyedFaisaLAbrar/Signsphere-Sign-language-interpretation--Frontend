import React from 'react';
import './Section5.css';
import accessibilityImage from '../assets/sign-image.png'; // Replace with correct image path

const Section5 = () => {
  return (
    <div className="accessibility-section">
      <div className="accessibility-content">
        <div className="text-column">
          <h2>Enhance your organisation's <span>accessibility</span></h2>
          <p>
            Empower Deaf people with our cutting-edge Generative AI sign language translation.
            Perfect for public space announcements, videos, and websites, our technology ensures
            accurate and engaging communication that makes a meaningful impact.
          </p>
          <ul className="accessibility-list">
            <li>Public spaces, websites, and video translation.</li>
            <li>Fast and cost-effective AI translation software.</li>
            <li>Developed for organisations and businesses.</li>
          </ul>
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
