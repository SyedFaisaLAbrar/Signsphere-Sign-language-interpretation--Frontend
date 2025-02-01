import React from "react";
import "./AboutUs.css";
import missionImage from '../assets/globe-animation.mp4'; // Replace with the image path

const AboutUs = () => {
  return (
    <div className="aboutus-container">
  <header className="aboutus-header">
    <h1>About Us</h1>
    <p>Discover who we are and what we stand for.</p>
  </header>
  <div className="video-contain">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="background-video"
    >
      <source src={missionImage} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <section className="aboutus-content">
    <div className="aboutus-card">
      <h2>Our Mission</h2>
      <p>
        At SignSphere, our mission is to bridge the gap between the hearing and Deaf communities by
        providing cutting-edge sign language interpretation tools. We are dedicated to empowering
        inclusivity and communication through innovative technology.
      </p>
    </div>
    <div className="aboutus-card">
      <h2>Our Vision</h2>
      <p>
        To be the global leader in sign language interpretation, fostering understanding and
        collaboration in every corner of the world through AI-driven solutions.
      </p>
    </div>
    <div className="aboutus-card">
      <h2>Why Choose Us</h2>
      <p>
        With our prossessable dataset of pakistan sign language, state-of-the-art AI models, and a passionate
        team, SignSphere delivers the most accurate, reliable, and user-friendly sign language
        translation services.
      </p>
    </div>
  </section>
</div>

  );
};

export default AboutUs;
