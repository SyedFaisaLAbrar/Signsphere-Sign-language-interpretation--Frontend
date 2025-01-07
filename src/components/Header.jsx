import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="header">
      {/* Green Top Strip */}
      <div className="top-strip">
        <p>Signsphere | Your AI-powered PSL Interpreter</p>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <a href="/" className="logo">
          Signsphere
        </a>

        {/* Hamburger Icon (Visible on mobile) */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          <div className={`line ${menuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Nav Links (visible when menu is open or on larger screens) */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="/interpreter">Interpreter</a></li>
          <li><a href="/dictionary">Dictionary</a></li>
          <li><a href="/aboutus">About Us</a></li>
          
        </ul>

      </nav>
    </div>
  );
};

export default Header;
