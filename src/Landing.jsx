import React, { useState } from "react";
import "./Index.css";

function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">AS Bank</div>
        
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>

      <header className="hero" id="home">
        <h1>Welcome to AS Bank</h1>
        <p>Your trusted Pakistani banking partner</p>
        <button>Open Account</button>
      </header>

      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="card">
            <h3>Savings Account</h3>
            <p>Secure and reliable savings options with competitive interest.</p>
          </div>
          <div className="card">
            <h3>Online Banking</h3>
            <p>Bank anytime, anywhere with our easy online banking platform.</p>
          </div>
          <div className="card">
            <h3>Loans</h3>
            <p>Personal, business, and home loans with transparent terms.</p>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>About AS Bank</h2>
        <p>
          AS Bank is fully compliant with Pakistani banking laws and regulations.
          We prioritize customer safety, secure transactions, and excellent service.
        </p>
      </section>

      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>Email: asbank@gmail.com</p>
          <p>Phone: +92 300 1234567</p>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 AS Bank Pakistan. All Rights Reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9em', opacity: '0.7' }}>
          Proudly serving Pakistan since 2020
        </p>
      </footer>
    </div>
  );
}

export default Landing;