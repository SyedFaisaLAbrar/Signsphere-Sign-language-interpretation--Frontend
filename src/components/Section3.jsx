import React from 'react';
import './Section3.css';
import missionImage from '../assets/product-image.png'; // Replace with the image path

const Section3 = () => {
  return (
    <div className="mission-section">
      <h2 className="mission-heading">The Mission</h2>
      <div className="mission-container">
        {/* Left Box */}
        <div className="mission-box mission-box-left">
          <h3>Introducing our real-time Generative AI sign language translation software</h3>
          <p>
            Designed to break down communication barriers instantly, our platform delivers accurate
            translations for sign language users, organizations, and communities.
          </p>
          <button className="mission-button">More about us</button>
        </div>

        {/* Middle Box */}
        <div className="mission-box mission-box-middle">
          <h3>Over</h3>
          <h1>5,000</h1>
          <p>Interactions with our translation tools.</p>
        </div>

        {/* Right Box */}
        <div className="mission-box mission-box-right">
          <h1>7m</h1>
          <p>Platform-wide user interactions.</p>
          <img src={missionImage} alt="User Interaction" />
        </div>
      </div>
    </div>
  );
};

export default Section3;
