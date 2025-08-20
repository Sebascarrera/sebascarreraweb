import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/home.css';
import videoBg from '../assets/video-fondo.mp4'; // Cambia el path según tu proyecto

function Home() {
  const { lang = 'es' } = useParams();
  const projectPath = lang === 'en' ? 'projects' : 'proyectos';
  const buttonText = lang === 'en' ? 'View projects' : 'Ver proyectos';

  return (
    <section className="home">
      <video className="background-video" autoPlay muted loop playsInline>
        <source src={videoBg} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <div className="home-content">
        <h1>Juan Sebastián Carrera Moya</h1>
        <h2>Diseñador y Desarrollador Web Frontend</h2>
        <p>Transformo ideas en experiencias digitales impactantes y funcionales.</p>
        <div className="buttons">
          <Link to={`/${lang}/${projectPath}`} className="btn">{buttonText}</Link>
          {/*<a href="/cv.pdf" className="btn" download>Descargar CV</a>*/}
        </div>
      </div>
    </section>
  );
}

export default Home;
