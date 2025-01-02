import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-col">
            <h3>Address</h3>
            <p>
              123 Main Street<br />
              London, United Kingdom<br />
              info@company.com
            </p>
          </div>
          <div className="footer-col">
            <h3>Products</h3>
            <ul>
              <li>SignStudio Platform</li>
              <li>Video Translation</li>
              <li>Solutions for Partners</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Menu</h3>
            <ul>
              <li>Pricing</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Company Name. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
