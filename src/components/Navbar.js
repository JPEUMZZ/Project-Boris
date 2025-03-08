import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState } from "react";
import "../style/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo/Site title */}
          <div className="navbar-logo">
            <Link to="/" className="site-title">
              EcoPartage
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={toggleMenu}
              className="hamburger-button"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu (three lines when closed, X when open) */}
              {!isOpen ? (
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="desktop-menu">
            <ul className="nav-links">
              <CustomLink to="/Annonces">Annonces</CustomLink>
              <CustomLink to="/Evenements">Evenements</CustomLink>
              <CustomLink to="/Localisation">Localisation</CustomLink>
              <CustomLink to="/Contact">Contact</CustomLink>
              <div className="divider"></div>
              <CustomLink to="/Login" className="login-link">Login</CustomLink>
              <CustomLink to="/SignUp" className="signup-link">SignUp</CustomLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <MobileLink to="/Annonces" onClick={toggleMenu}>Annonces</MobileLink>
            <MobileLink to="/Evenements" onClick={toggleMenu}>Evenements</MobileLink>
            <MobileLink to="/Localisation" onClick={toggleMenu}>Localisation</MobileLink>
            <MobileLink to="/Contact" onClick={toggleMenu}>Contact</MobileLink>
            <div className="mobile-divider"></div>
            <MobileLink to="/Login" onClick={toggleMenu} className="mobile-login">Login</MobileLink>
            <MobileLink to="/SignUp" onClick={toggleMenu} className="mobile-signup">
              SignUp
            </MobileLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function CustomLink({ to, children, className = "", ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
  return (
    <li>
      <Link 
        to={to} 
        className={`nav-link ${isActive ? "active" : ""} ${className}`}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}

function MobileLink({ to, children, className = "", onClick, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
  return (
    <Link 
      to={to} 
      className={`mobile-nav-link ${isActive ? "active" : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}