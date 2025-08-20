import React from 'react';

import '../styles/home.css';
import videoBg from '../assets/video-fondo.mp4';

function Home() {

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

        </div>
      </div>
    </section>
  );
}

export default Home;
