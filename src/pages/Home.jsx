import React from 'react';
import '../styles/home.css';
import videoBg from '../assets/video-fondo.mp4'; // Cambia el path según tu proyecto

function Home() {
  return (
    <section className="home">
      <video className="background-video" autoPlay muted loop playsInline>
        <source src={videoBg} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <div className="home-content">
        <h1>Sebastián Carrera Moya</h1>
        <h2>Diseñador y Desarrollador Web Frontend</h2>
        <p>Transformo ideas en experiencias digitales impactantes y funcionales.</p>
        <div className="buttons">
          <a href="#proyectos" className="btn">Ver proyectos</a>
          <a href="/cv.pdf" className="btn" download>Descargar CV</a>
        </div>
      </div>
    </section>
  );
}

export default Home;
