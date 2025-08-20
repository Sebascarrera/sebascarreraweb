// src/components/Navbar.jsx
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



  return (
    <nav className="navbar">
      <div className="navbar-logo">

      <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>

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
