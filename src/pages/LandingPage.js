// LandingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/landing.css';

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-wrapper">
      {/* Enhanced Navbar with Scroll Effect */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand">
          <span className="nav-logo">QuickDesk</span>
          <span className="creator-tag">by Harshini & Mohammed Suhail</span>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="nav-button login-btn">
            <span>Login</span>
          </Link>
          <Link to="/register" className="nav-button register-btn">
            <span>Register</span>
          </Link>
        </div>
      </nav>

      {/* Animated Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="title-line">Streamline Your</span>
            <span className="title-line accent">Support System</span>
          </h1>
          <p className="hero-subtitle">
            QuickDesk provides an elegant help desk solution developed by Harshini and Mohammed Suhail.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="cta-button primary">
              <span>Get Started</span>
              <div className="hover-effect"></div>
            </Link>
            <Link to="/login" className="cta-button secondary">
              <span>Live Demo</span>
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-container">
            <div className="gradient-circle"></div>
            <div className="support-illustration"></div>
          </div>
        </div>
      </main>

      {/* Glowing Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>Built with passion by Harshini & Mohammed Suhail</p>
          <div className="footer-glow"></div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;