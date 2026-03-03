import React, { useEffect, useRef, useState } from 'react';
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
import FullStaffImage from '../assets/projects/fullstaff.png';
import FullStaffVideo from '../assets/videos/fullstaff.mp4';
import gogoRacingImage from '../assets/projects/gogo-racing.png';
import gogoRacingVideo from '../assets/videos/gogoracing.mp4';
import moneyWeekImage from '../assets/projects/money-week.png';
import moneyWeekJpg from '../assets/videos/moneyweek-challenge.jpg';
import sprintFalabellaImage from '../assets/projects/sprint-falabella.png';
import sprintFalabellaJpg from '../assets/videos/sprint-falabella.jpg';
import iabdbenkoImage from '../assets/projects/iaBdb-Enko.png';
import iabdbenkoVideo from '../assets/videos/iaBdb-Enko.mp4';

function Projects() {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);
  const sectionRef = useRef(null);

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
      image: FullStaffImage,
      video: FullStaffVideo,
      link: 'https://github.com/tuusuario/pacman-antifraude'
    },
    {
      id: 6,
      title: t('projects.items.6.title'),
      description: t('projects.items.6.description'),
      image: gogoRacingImage,
      video: gogoRacingVideo,
      link: 'https://github.com/tuusuario/app-propositos'
    },
    {
      id: 7,
      title: t('projects.items.7.title'),
      description: t('projects.items.7.description'),
      image: moneyWeekImage,
      modalImage: moneyWeekJpg, 
      link: 'https://github.com/tuusuario/portafolio'
    },
    {
      id: 8,
      title: t('projects.items.8.title'),
      description: t('projects.items.8.description'),
      image: sprintFalabellaImage,
      modalImage: sprintFalabellaJpg, 
      link: 'https://github.com/tuusuario/pacman-antifraude'
    },
    {
      id: 9,
      title: t('projects.items.9.title'),
      description: t('projects.items.9.description'),
      image: iabdbenkoImage,
      video: iabdbenkoVideo,
      link: 'https://github.com/tuusuario/app-propositos'
    }
  ];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const revealElements = root.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // anima una vez (no afecta el flujo)
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -120px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openModal = (id) => setActiveVideo(id);
  const closeModal = () => setActiveVideo(null);
  const activeProject = projects.find((p) => p.id === activeVideo);

  return (
    <section ref={sectionRef} className="projects-container">
      <h2 className="reveal">{t('projects.title')}</h2>

      {/* IMPORTANTE: quitamos "reveal" de projects-grid */}
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div
            className="project-card reveal"
            key={project.id}
            style={{ transitionDelay: `${idx * 80}ms` }} // opcional: entrada escalonada
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {(project.video || project.modalImage) && (
            <button className="video-btn" onClick={() => openModal(project.id)}>
              {project.video ? t('projects.viewVideo') : (t('projects.viewImage') || 'Ver imagen')}
            </button>
          )}
          </div>
        ))}
      </div>

      {activeProject && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>✕</button>

          {activeProject.video ? (
            <video controls autoPlay className="modal-video">
              <source src={activeProject.video} type="video/mp4" />
              {t('common.noVideoSupport')}
            </video>
          ) : activeProject.modalImage ? (
            <img
              src={activeProject.modalImage}
              alt={activeProject.title}
              className="modal-image"
            />
          ) : null}
        </div>
      </div>
    )}

    </section>
  );
}

export default Projects;
