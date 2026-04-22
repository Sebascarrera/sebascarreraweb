// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/navbar.css';
import { LanguageContext } from '../context/LanguageContext.jsx';

import logoIcon from '../assets/img/icono-imp.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLanguageChange = (lng) => {
    setLanguage(lng);
    closeMenu();
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu} className="logo-stack" aria-label="Ir al inicio">
          <img
            src={logoIcon}
            alt="Logo JSCM"
            className="logo-icon glow-pulse"
            width="40"
            height="40"
            decoding="async"
          />
        </Link>
      </div>

      <button
        className={`navbar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        aria-controls="main-menu"
      >
        <span></span><span></span><span></span>
      </button>

      <ul id="main-menu" className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <a href="#showreel" onClick={closeMenu}>{t('nav.showreel')}</a>
        </li>
        <li>
          <a href="#proyectos" onClick={closeMenu}>{t('nav.projects')}</a>
        </li>
        <li>
          <a href="#habilidades" onClick={closeMenu}>{t('nav.skills')}</a>
        </li>
        <li>
          <a href="#contacto" onClick={closeMenu}>{t('nav.contact')}</a>
        </li>

        <li className="language-selector">
          <div className="lang-pill" role="group" aria-label="Cambiar idioma">
            <button
              className={`lang-pill__btn ${language === 'es' ? 'lang-pill__btn--active' : ''}`}
              onClick={() => handleLanguageChange('es')}
            >ES</button>
            <button
              className={`lang-pill__btn ${language === 'en' ? 'lang-pill__btn--active' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >EN</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
