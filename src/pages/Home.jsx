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
    <>
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
            <Link to="/selector" className="btn btn--ghost">{t('home.experienceCta')}</Link>
          </div>
        </div>
      </section>

      <section className="home-experience">
        <div className="home-experience__inner">
          <span className="home-experience__eyebrow">{t('home.experienceEyebrow')}</span>
          <h2 className="home-experience__title">{t('home.experienceTitle')}</h2>
          <p className="home-experience__description">{t('home.experienceDescription')}</p>
          <Link to="/selector" className="home-experience__link">
            {t('home.experienceLinkLabel')}
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
