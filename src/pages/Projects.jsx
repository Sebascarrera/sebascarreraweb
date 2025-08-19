import React, { useEffect, useState } from 'react';
import '../styles/projects.css';
import ciberImage from '../assets/projects/ciberseguridad.png';
import ciberseguridadVideo from '../assets/videos/ciberseguridad.mp4';
import mundoColmenaImage from '../assets/projects/mundo-colmena.png';
import mundoColmenaVideo from '../assets/videos/mundo-colmena.mp4';
import ColmenaRouteImage from '../assets/projects/colmena-route-game.png';
import ColmenaRouteVideo from '../assets/videos/COLMENA-ROUTE-GAME.mp4';
import UkcolTouchImage from '../assets/projects/ukcol-touch.png';
import UkcolTouchVideo from '../assets/videos/ukcol-touch.mp4';

const projects = [
  {
    id: 1,
    title: "Landing Ciberseguridad",
    description: "Diseño y desarrollo de Landing Web para una campaña interna sobre Ciberseguridad a los empleados de Porvenir.",
    image: ciberImage,
    video: ciberseguridadVideo,
    link: "https://github.com/tuusuario/portafolio"
  },
  {
    id: 2,
    title: "Mundo Colmena",
    description: "Landing de juego educativo interactivo desarrollado con React y animaciones CSS, la finalidad del juego era que los participantes fueran buscando en diferentes lugares unos QR Codes donde los dirijian a secciones especificas de la landing para realizar distintos retos relacionados con el evento y cumplir con informar de una manera dinámica e interactiva.",
    image: mundoColmenaImage,
    video: mundoColmenaVideo,
    link: "https://github.com/tuusuario/pacman-antifraude"
  },
  {
    id: 3,
    title: "Colmena Route Game",
    description: "Aplicación web para registrar y visualizar propósitos personales.",
    image: ColmenaRouteImage,
    video: ColmenaRouteVideo,
    link: "https://github.com/tuusuario/app-propositos"
  },
  {
    id: 4,
    title: "Juego UKCOL Vida Silvestre",
    description: "Juego interactivo desarrollado para pantallas touch, el cual busca enseñar de forma amigable sobre la diversidad del ecosistema Colombiano.",
    image: UkcolTouchImage,
    video: UkcolTouchVideo,
    link: "https://github.com/tuusuario/portafolio"
  },
  {
    id: 5,
    title: "Juego de Pacman Antifraude",
    description: "Juego educativo interactivo desarrollado con React y animaciones CSS.",
    image: "/assets/projects/pacman.png",
    link: "https://github.com/tuusuario/pacman-antifraude"
  },
  {
    id: 6,
    title: "App de Propósitos",
    description: "Aplicación web para registrar y visualizar propósitos personales.",
    image: "/assets/projects/propositos.png",
    link: "https://github.com/tuusuario/app-propositos"
  },
  {
    id: 7,
    title: "Portafolio Personal",
    description: "Diseño y desarrollo de mi sitio web como diseñador y desarrollador front-end.",
    image: "/assets/projects/portafolio.png",
    link: "https://github.com/tuusuario/portafolio"
  },
  {
    id: 8,
    title: "Juego de Pacman Antifraude",
    description: "Juego educativo interactivo desarrollado con React y animaciones CSS.",
    image: "/assets/projects/pacman.png",
    link: "https://github.com/tuusuario/pacman-antifraude"
  },
  {
    id: 9,
    title: "App de Propósitos",
    description: "Aplicación web para registrar y visualizar propósitos personales.",
    image: "/assets/projects/propositos.png",
    link: "https://github.com/tuusuario/app-propositos"
  }
];

function Projects() {
  const [activeVideo, setActiveVideo] = useState(null);
  const activeProject = projects.find(p => p.id === activeVideo);
  // 👇 Scroll reveal
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const handleScroll = () => {
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (id) => setActiveVideo(id);
  const closeModal = () => setActiveVideo(null);

  return (
    <section className="projects-container">
      <h2 className="reveal">Proyectos destacados</h2>
      <div className="projects-grid reveal">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Ver proyecto
            </a>
            {project.video && (
              <button className="video-btn" onClick={() => openModal(project.id)}>
                Ver video
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <video controls autoPlay className="modal-video">
              <source src={activeProject.video} type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
