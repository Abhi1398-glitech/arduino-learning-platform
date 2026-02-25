import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/settings', label: 'Settings' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">Arduino</span>
          <span className="logo-accent">Learn</span>
          <span className="logo-bracket">{'/>'}</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                {label}
                {location.pathname === path && <span className="nav-underline" />}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="/courses" className="navbar-cta">
          Start Learning
        </Link>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`mobile-link ${location.pathname === path ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/courses" className="btn-primary mobile-cta">
          Start Learning
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;