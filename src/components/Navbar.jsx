// src/components/Navbar.jsx

import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import { LanguageContext } from '../context/LanguageContext.jsx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { t } = useTranslation();

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
            {t('nav.projects')}
          </Link>
        </li>
        <li>
          <Link to="/habilidades" onClick={closeMenu} className={location.pathname === '/habilidades' ? 'active' : ''}>
            {t('nav.skills')}
          </Link>
        </li>
        <li>
          <Link to="/contacto" onClick={closeMenu} className={location.pathname === '/contacto' ? 'active' : ''}>
            {t('nav.contact')}
          </Link>
        </li>
        <li className="language-selector">
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </li>
      </ul>
      <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </nav>
  );
}

export default Navbar;
