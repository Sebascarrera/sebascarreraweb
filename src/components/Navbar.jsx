// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang = 'es' } = useParams();

  const paths = {
    es: { projects: 'proyectos', skills: 'habilidades', contact: 'contacto' },
    en: { projects: 'projects', skills: 'skills', contact: 'contact' }
  };

  const labels = {
    es: { projects: 'Proyectos', skills: 'Habilidades', contact: 'Contacto' },
    en: { projects: 'Projects', skills: 'Skills', contact: 'Contact' }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const currentPath = location.pathname;
  const langPaths = paths[lang] || paths.es;
  const langLabels = labels[lang] || labels.es;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to={`/${lang}`} onClick={closeMenu} className="signature">Sebastian Carrera</Link>
      </div>
      <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link
            to={`/${lang}/${langPaths.projects}`}
            onClick={closeMenu}
            className={currentPath.endsWith(`/${langPaths.projects}`) ? 'active' : ''}
          >
            {langLabels.projects}
          </Link>
        </li>
        <li>
          <Link
            to={`/${lang}/${langPaths.skills}`}
            onClick={closeMenu}
            className={currentPath.endsWith(`/${langPaths.skills}`) ? 'active' : ''}
          >
            {langLabels.skills}
          </Link>
        </li>
        <li>
          <Link
            to={`/${lang}/${langPaths.contact}`}
            onClick={closeMenu}
            className={currentPath.endsWith(`/${langPaths.contact}`) ? 'active' : ''}
          >
            {langLabels.contact}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
