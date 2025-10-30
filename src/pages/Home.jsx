import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import videoBg from '../assets/background-portfolio-web-3.mp4';
import { LanguageContext } from '../context/LanguageContext.jsx';

// 🖼️ Logo PNG transparente (colócalo en src/assets/img/)
import jscmLogo from '../assets/img/jscm_logo_transparent.png';

function Home() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const projectsPath = language === 'en' ? '/projects' : '/proyectos';

  return (
    <>
      <section className="home">
        <video className="background-video" autoPlay muted loop playsInline>
          <source src={videoBg} type="video/mp4" />
          {t('common.noVideoSupport')}
        </video>

        <div className="home-content">
          {/* Reemplazo del h1 por el logo PNG */}
          <img
            src={jscmLogo}
            alt="JSCM — Juan Sebastian Carrera Moya"
            className="home-logo"
            decoding="async"
            width="560"
            height="560"
          />

          <h2>{t('home.subtitle')}</h2>
          <p>{t('home.description')}</p>

          <div className="buttons">
            <Link to={projectsPath} className="btn">{t('home.viewProjects')}</Link>
            <Link to="/selector" className="btn btn--ghost">{t('home.experienceCta')}</Link>
          </div>
        </div>
      </section>

      {/* Sección opcional
      <section className="home-experience">
        ...
      </section> */}
    </>
  );
}

export default Home;
