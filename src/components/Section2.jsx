import React, { useState } from 'react';
import './Section2.css';
import simplifyImage from '../assets/handanim.mp4'; // Replace with the UI image path

const Section2 = () => {

  const [showControls, setShowControls] = useState(true);
  return (
    <div className="simplify-section">
      <div className="simplify-container">
        {/* Left Image */}
        <div className="simplify-image">
          
        <video width="600" height="400" controls={showControls}
          onMouseEnter={() => setShowControls(false)} 
          onMouseLeave={() => setShowControls(false)}   loop autoPlay muted>
          <source src={simplifyImage} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        </div>

        {/* Right Text Content */}
        <div className="simplify-content">
          <span className="new-launch">🚀 New Launch</span>
          <h2>Simplify your traveling experience</h2>
          <p>
            Our groundbreaking platform makes it easier than ever to translate videos you sign
            languages, offering a seamless and quick communuication.
          </p>
          <button className="simplify-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Section2;
