import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      {/* Green Top Strip */}
      <div className="top-strip">
        <p>Signsphere | Your AI-powered PSL Interpreter</p>
        
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Signsphere</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#customers">Customers</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
        <button className="nav-button">Sign Up</button>
      </nav>
    </div>
  );
};

export default Header;
