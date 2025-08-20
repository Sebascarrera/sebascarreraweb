// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import i18n from 'i18next';
import '../styles/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLanguageChange = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    closeMenu();
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to="/" onClick={closeMenu} className="signature">Sebastian Carrera</Link>
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
        <li className="language-selector">
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
