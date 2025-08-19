// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>SCarrera</Link>
      </div>
      <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/proyectos" onClick={closeMenu} className={location.pathname === '/proyectos' ? 'active' : ''}>
            Proyectos
          </Link>
        </li>
        <li>
          <Link to="/habilidades" onClick={closeMenu} className={location.pathname === '/habilidades' ? 'active' : ''}>
            Habilidades
          </Link>
        </li>
        <li>
          <Link to="/contacto" onClick={closeMenu} className={location.pathname === '/contacto' ? 'active' : ''}>
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
