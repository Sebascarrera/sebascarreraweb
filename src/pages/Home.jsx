import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import videoBg from '../assets/video-fondo.mp4';
import { LanguageContext } from '../context/LanguageContext.jsx';

function Home() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const projectsPath = language === 'en' ? '/projects' : '/proyectos';

  return (
    <section className="home">
      <video className="background-video" autoPlay muted loop playsInline>
        <source src={videoBg} type="video/mp4" />
        {t('common.noVideoSupport')}
      </video>
      <div className="home-content">
        <h1>{t('home.name')}</h1>
        <h2>{t('home.subtitle')}</h2>
        <p>{t('home.description')}</p>
          <div className="buttons">
            <Link to={projectsPath} className="btn">{t('home.viewProjects')}</Link>
          </div>
        </div>
      </section>
  );
}

export default Home;
