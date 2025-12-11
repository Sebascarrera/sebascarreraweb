// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/navbar.css';
import { LanguageContext } from '../context/LanguageContext.jsx';

// 🖼️ Tu ícono (ruta confirmada por ti)
import logoIcon from '../assets/img/icono-imp.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLanguageChange = (lng) => {
    setLanguage(lng);
    const pathMap = {
      '/proyectos': '/projects',
      '/projects': '/proyectos',
      '/habilidades': '/skills',
      '/skills': '/habilidades',
      '/contacto': '/contact',
      '/contact': '/contacto',
    };
    const newPath = pathMap[location.pathname] || '/';
    navigate(newPath);
    closeMenu();
  };

  const navLinks = {
    projects: language === 'en' ? '/projects' : '/proyectos',
    skills: language === 'en' ? '/skills' : '/habilidades',
    contact: language === 'en' ? '/contact' : '/contacto',
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu} className="logo-stack" aria-label="Ir al inicio">
          {/* Ícono (PNG) con glow controlado */}
          <img
            src={logoIcon}
            alt="Logo JSCM"
            className="logo-icon glow-pulse"
            width="68"
            height="68"
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
          <Link
            to={navLinks.projects}
            onClick={closeMenu}
            className={location.pathname === navLinks.projects ? 'active' : ''}
          >
            {t('nav.projects')}
          </Link>
        </li>
        <li>
          <Link
            to={navLinks.skills}
            onClick={closeMenu}
            className={location.pathname === navLinks.skills ? 'active' : ''}
          >
            {t('nav.skills')}
          </Link>
        </li>
        <li>
          <Link
            to={navLinks.contact}
            onClick={closeMenu}
            className={location.pathname === navLinks.contact ? 'active' : ''}
          >
            {t('nav.contact')}
          </Link>
        </li>

        <li className="language-selector">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            aria-label="Cambiar idioma"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
