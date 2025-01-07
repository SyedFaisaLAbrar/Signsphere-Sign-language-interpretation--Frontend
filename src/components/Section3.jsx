import React from 'react';
import { useNavigate } from "react-router-dom";
import './Section3.css';
import missionImage from '../assets/globe-animation.mp4'; // Replace with the image path

const Section3 = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/aboutus");
  };

  return (
    <div className="mission-section">
      <h2 className="mission-heading">The Mission</h2>
      <div className="mission-container grid grid-cols-3 gap-12">
      {/* Left Box */}
      <div className="mission-box mission-box-left col-span-1">
        <h3>Introducing our real-time AI sign language translation</h3>
        <p>
        The <span class="highlighted">SignSphere</span> endeavors to revolutionize the travel experience for individuals with hearing impairments.
        <br/>
        By introducing a cutting-edge system, this project empowers <span class="highlighted">deaf travelers</span> to explore tourist attractions with <span class="highlighted">sign language-based interaction.</span>
        </p>
        <button onClick={handleRedirect} className="mission-button">More about us</button>
      </div>

      {/* Right Box (Video section) */}
      <div className="mission-box mission-box-right col-span-2">

      <div className="video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
        >
        <source src={missionImage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>


    </div>
  );
};

export default Section3;
