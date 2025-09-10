import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/projects.css';
import ciberImage from '../assets/projects/ciberseguridad.png';
import ciberseguridadVideo from '../assets/videos/ciberseguridad.mp4';
import mundoColmenaImage from '../assets/projects/mundo-colmena.png';
import mundoColmenaVideo from '../assets/videos/mundo-colmena.mp4';
import ColmenaRouteImage from '../assets/projects/colmena-route-game.png';
import ColmenaRouteVideo from '../assets/videos/COLMENA-ROUTE-GAME.mp4';
import UkcolTouchImage from '../assets/projects/ukcol-touch.png';
import UkcolTouchVideo from '../assets/videos/ukcol-touch.mp4';

function Projects() {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);

  const projects = [
    {
      id: 1,
      title: t('projects.items.1.title'),
      description: t('projects.items.1.description'),
      image: ciberImage,
      video: ciberseguridadVideo,
      link: 'https://github.com/tuusuario/portafolio'
    },
    {
      id: 2,
      title: t('projects.items.2.title'),
      description: t('projects.items.2.description'),
      image: mundoColmenaImage,
      video: mundoColmenaVideo,
      link: 'https://github.com/tuusuario/pacman-antifraude'
    },
    {
      id: 3,
      title: t('projects.items.3.title'),
      description: t('projects.items.3.description'),
      image: ColmenaRouteImage,
      video: ColmenaRouteVideo,
      link: 'https://github.com/tuusuario/app-propositos'
    },
    {
      id: 4,
      title: t('projects.items.4.title'),
      description: t('projects.items.4.description'),
      image: UkcolTouchImage,
      video: UkcolTouchVideo,
      link: 'https://github.com/tuusuario/portafolio'
    },
    {
      id: 5,
      title: t('projects.items.5.title'),
      description: t('projects.items.5.description'),
      image: '/assets/projects/pacman.png',
      link: 'https://github.com/tuusuario/pacman-antifraude'
    },
    {
      id: 6,
      title: t('projects.items.6.title'),
      description: t('projects.items.6.description'),
      image: '/assets/projects/propositos.png',
      link: 'https://github.com/tuusuario/app-propositos'
    },
    {
      id: 7,
      title: t('projects.items.7.title'),
      description: t('projects.items.7.description'),
      image: '/assets/projects/portafolio.png',
      link: 'https://github.com/tuusuario/portafolio'
    },
    {
      id: 8,
      title: t('projects.items.8.title'),
      description: t('projects.items.8.description'),
      image: '/assets/projects/pacman.png',
      link: 'https://github.com/tuusuario/pacman-antifraude'
    },
    {
      id: 9,
      title: t('projects.items.9.title'),
      description: t('projects.items.9.description'),
      image: '/assets/projects/propositos.png',
      link: 'https://github.com/tuusuario/app-propositos'
    }
  ];

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
  const activeProject = projects.find(p => p.id === activeVideo);

  return (
    <section className="projects-container">
      <h2 className="reveal">{t('projects.title')}</h2>
      <div className="projects-grid reveal">
        {projects.map((project) => (
          <div className="project-card reveal" key={project.id}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {t('projects.viewProject')}
            </a>
            {project.video && (
              <button className="video-btn" onClick={() => openModal(project.id)}>
                {t('projects.viewVideo')}
              </button>
            )}
          </div>
        ))}
      </div>

      {activeProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <video controls autoPlay className="modal-video">
              <source src={activeProject.video} type="video/mp4" />
              {t('common.noVideoSupport')}
            </video>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
