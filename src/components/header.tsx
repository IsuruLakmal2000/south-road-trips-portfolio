import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from '../assets/Asset-3.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        
        <div className="logo">
          <Link to="/" onClick={handleNavClick}>
            <img src={logo} alt="South Road Trips" className="logo-image" />
          </Link>
        </div>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={handleNavClick}>Home</Link>
          <a href="/#vehicles" className="nav-link" onClick={handleNavClick}>Vehicles</a>
          <a href="/#tours" className="nav-link" onClick={handleNavClick}>Tours</a>
          <Link to="/blog" className="nav-link" onClick={handleNavClick}>Blog</Link>
          <a href="/#about" className="nav-link" onClick={handleNavClick}>About</a>
          <a href="/#contact" className="nav-link" onClick={handleNavClick}>Contact Us</a>
          <a 
            href="https://wa.me/94764549169?text=Hi%20South%20Road%20Trips!%20I'd%20like%20to%20make%20a%20booking.%20Can%20you%20help%20me%3F" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="book-btn"
          >
            <span>Book Now</span>
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </nav>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
};

export default Header;
