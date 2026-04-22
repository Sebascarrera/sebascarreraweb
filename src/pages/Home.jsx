import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import jscmLogo from '../assets/img/icono-imp-hero.png';
import videoBg from '../assets/background-portfolio-web-4.mp4';
import imgEmail from '../assets/img/email-icon.svg';
import imgWhatsapp from '../assets/img/whatsapp-icon.svg';

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

import ProjectCard from '../components/ProjectCard.jsx';
import DotGridBackground from '../components/DotGridBackground.jsx';

/* ── Skill categories ── */
const skillCategories = [
  {
    key: 'ai',
    title: 'Inteligencia Artificial',
    skills: [
      { name: 'GitHub Copilot', pct: 92 },
      { name: 'ChatGPT Codex', pct: 90 },
      { name: 'Heygen', pct: 88 },
      { name: 'ElevenLabs', pct: 85 },
      { name: 'Midjourney', pct: 90 },
      { name: 'Runway', pct: 87 },
      { name: 'Envato', pct: 80 },
    ],
  },
  {
    key: 'tech',
    title: 'Lenguajes & Tecnologías',
    skills: [
      { name: 'HTML5', pct: 98 },
      { name: 'CSS3', pct: 95 },
      { name: 'JavaScript', pct: 90 },
      { name: 'React', pct: 95 },
      { name: 'WordPress', pct: 75 },
    ],
  },
  {
    key: 'design',
    title: 'Diseño & UI/UX',
    skills: [
      { name: 'Figma', pct: 95 },
      { name: 'Sketch', pct: 80 },
      { name: 'Adobe XD', pct: 85 },
      { name: 'Photoshop', pct: 90 },
      { name: 'Illustrator', pct: 88 },
      { name: 'After Effects', pct: 85 },
    ],
  },
  {
    key: 'frontend',
    title: 'Desarrollo Front-End',
    skills: [
      { name: 'Componentes reutilizables', pct: 95 },
      { name: 'Diseño responsivo', pct: 98 },
      { name: 'Optimización de rendimiento', pct: 85 },
      { name: 'Accesibilidad (A11y)', pct: 80 },
    ],
  },
  {
    key: 'video',
    title: 'Producción Audiovisual',
    skills: [
      { name: 'Premiere Pro', pct: 90 },
      { name: 'After Effects', pct: 88 },
      { name: 'Realización audiovisual', pct: 85 },
      { name: 'Motion Graphics', pct: 82 },
    ],
  },
  {
    key: 'tools',
    title: 'Herramientas & Metodologías',
    skills: [
      { name: 'Git', pct: 95 },
      { name: 'SCRUM', pct: 88 },
      { name: 'SEO técnico básico', pct: 78 },
      { name: 'Deployment con Vite', pct: 85 },
    ],
  },
  {
    key: 'soft',
    title: 'Soft Skills',
    skills: [
      { name: 'Liderazgo de proyectos', pct: 92 },
      { name: 'Comunicación efectiva', pct: 95 },
      { name: 'Pensamiento creativo', pct: 98 },
      { name: 'Gestión del tiempo', pct: 88 },
    ],
  },
];

/* ── Timeline data (real CV) ── */
const timelineItems = [
  {
    period: 'Sep. 2024 – Jul. 2025',
    company: 'Mentor Canada',
    role: 'Designer',
    description:
      'Responsable de actualizar y modernizar todos los materiales impresos. Lideré el proceso creativo asegurando consistencia con la identidad de marca.',
  },
  {
    period: 'Ene. 2022 – Presente',
    company: 'Freelance',
    role: 'Front-End Designer & Developer',
    description:
      'Diseñador y desarrollador front-end con experiencia en sitios web completos y juegos interactivos. Proyectos con HTML, CSS, JavaScript y React.',
  },
  {
    period: 'Abr. 2016 – Ene. 2022',
    company: 'Imperia Software Solutions',
    role: 'CEO',
    description:
      'Lideré el proceso creativo y ejecución de proyectos digitales. Dirigí equipos en creación de interfaces web combinando estética y funcionalidad.',
  },
  {
    period: 'Oct. 2010 – Mar. 2016',
    company: 'Moya Producciones',
    role: 'Graphic Designer',
    description:
      'Creación de diseños visuales para plataformas y medios digitales. Desarrollo de contenido audiovisual con Premiere Pro y After Effects.',
  },
  {
    period: 'Dic. 2012 – Abr. 2015',
    company: 'Singularcom',
    role: 'Graphic Designer',
    description:
      'Creación de piezas gráficas para comunicaciones internas y externas. Diseño de contenido visual para plataformas web y materiales de TV.',
  },
];

/* ── Contact data ── */
const EMAIL = 'sebascarreramoya@gmail.com';
const WHATSAPP_LINK = 'https://wa.me/573133510006';
const WHATSAPP_DISPLAY = '+57 3133510006';

function Home() {
  const { t } = useTranslation();
  /* ── Modal state ── */
  const [activeVideo, setActiveVideo] = useState(null);

  /* ── Projects array ── */
  const projects = [
    { id: 1, image: ciberImage,           video: ciberseguridadVideo,     title: t('projects.items.1.title'), description: t('projects.items.1.description'), stack: t('projects.items.1.stack', { returnObjects: true }), problem: t('projects.items.1.problem'), solution: t('projects.items.1.solution') },
    { id: 2, image: mundoColmenaImage,    video: mundoColmenaVideo,       title: t('projects.items.2.title'), description: t('projects.items.2.description'), stack: t('projects.items.2.stack', { returnObjects: true }), problem: t('projects.items.2.problem'), solution: t('projects.items.2.solution') },
    { id: 3, image: ColmenaRouteImage,    video: ColmenaRouteVideo,       title: t('projects.items.3.title'), description: t('projects.items.3.description'), stack: t('projects.items.3.stack', { returnObjects: true }), problem: t('projects.items.3.problem'), solution: t('projects.items.3.solution') },
    { id: 4, image: UkcolTouchImage,      video: UkcolTouchVideo,         title: t('projects.items.4.title'), description: t('projects.items.4.description'), stack: t('projects.items.4.stack', { returnObjects: true }), problem: t('projects.items.4.problem'), solution: t('projects.items.4.solution') },
    { id: 5, image: FullStaffImage,       video: FullStaffVideo,          title: t('projects.items.5.title'), description: t('projects.items.5.description'), stack: t('projects.items.5.stack', { returnObjects: true }), problem: t('projects.items.5.problem'), solution: t('projects.items.5.solution') },
    { id: 6, image: gogoRacingImage,      video: gogoRacingVideo,         title: t('projects.items.6.title'), description: t('projects.items.6.description'), stack: t('projects.items.6.stack', { returnObjects: true }), problem: t('projects.items.6.problem'), solution: t('projects.items.6.solution') },
    { id: 7, image: moneyWeekImage,       modalImage: moneyWeekJpg,       title: t('projects.items.7.title'), description: t('projects.items.7.description'), stack: t('projects.items.7.stack', { returnObjects: true }), problem: t('projects.items.7.problem'), solution: t('projects.items.7.solution') },
    { id: 8, image: sprintFalabellaImage, modalImage: sprintFalabellaJpg, title: t('projects.items.8.title'), description: t('projects.items.8.description'), stack: t('projects.items.8.stack', { returnObjects: true }), problem: t('projects.items.8.problem'), solution: t('projects.items.8.solution') },
    { id: 9, image: iabdbenkoImage,       video: iabdbenkoVideo,          title: t('projects.items.9.title'), description: t('projects.items.9.description'), stack: t('projects.items.9.stack', { returnObjects: true }), problem: t('projects.items.9.problem'), solution: t('projects.items.9.solution') },
  ];

  /* ── IntersectionObserver for .reveal cards ── */
  const allProjectsRef = useRef(null);
  useEffect(() => {
    const root = allProjectsRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );
    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Skills animation ── */
  const skillsRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);
  const activeRef = useRef(false);
  const fillRefs  = useRef([]);
  const pctRefs   = useRef([]);

  useEffect(() => {
    const section = skillsRef.current;
    if (!section) return;

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
    const easeInCubic  = t => t * t * t;
    const CYCLE = 5200;
    const UP    = 3800;
    const DOWN  = 1400;
    const MIN   = 10;

    const flat = skillCategories.flatMap((cat, ci) =>
      cat.skills.map(s => ({ target: s.pct, delay: ci * 120 }))
    );

    function animate(now) {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;

      flat.forEach(({ target, delay }, idx) => {
        const fill = fillRefs.current[idx];
        const pct  = pctRefs.current[idx];
        if (!fill || !pct) return;

        const t = elapsed < delay
          ? 0
          : ((elapsed - delay) % CYCLE);

        const val = t < UP
          ? MIN + (target - MIN) * easeOutCubic(t / UP)
          : MIN + (target - MIN) * (1 - easeInCubic((t - UP) / DOWN));

        const rounded = Math.round(val);
        fill.style.width  = rounded + '%';
        pct.textContent   = rounded + '%';
      });

      if (activeRef.current) rafRef.current = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeRef.current = true;
          startRef.current  = null;
          rafRef.current = requestAnimationFrame(animate);
        } else {
          activeRef.current = false;
          cancelAnimationFrame(rafRef.current);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const openModal  = (id) => setActiveVideo(id);
  const closeModal = ()   => setActiveVideo(null);
  const activeProject = projects.find((p) => p.id === activeVideo);

  return (
    <main className="home-page">
      <DotGridBackground />

      {/* ── 1. HERO ── */}
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__name">{t('home.name')}</h1>
          <p className="hero__subtitle">{t('home.subtitle')}</p>
          <p className="hero__desc">{t('home.description')}</p>
          <div className="hero__ctas">
            <a href="#proyectos" className="btn-primary">{t('home.viewProjects')}</a>
            <Link to="/selector" className="btn-ghost">{t('home.experienceCta')}</Link>
          </div>
        </div>
        <div className="hero__logo-wrap">
          <div className="hero__logo-glow" />
          <img
            src={jscmLogo}
            alt="JSCM — Juan Sebastián Carrera Moya"
            className="hero__logo"
            decoding="async"
            width="620"
            height="620"
          />
        </div>
      </section>

      {/* ── 1b. SHOWREEL ── */}
      <section id="showreel" className="home-section home-showreel">
        <h2 className="section-title showreel__title">{t('home.showreel.title')}</h2>
        <p className="showreel__subtitle">{t('home.showreel.subtitle')}</p>
        <div className="showreel__video-wrap">
          <video className="showreel__video" src={videoBg} controls muted loop playsInline>
            {t('common.noVideoSupport')}
          </video>
        </div>
        <div className="showreel__ctas">
          <a href="#proyectos" className="btn-primary">{t('home.viewProjects')}</a>
          <Link to="/selector" className="btn-ghost">{t('home.experienceCta')}</Link>
        </div>
      </section>

      {/* ── 2. PROYECTOS DESTACADOS ── */}
      <section id="proyectos" className="home-section home-projects">
        <h2 className="section-title">{t('projects.title')}</h2>
        <div className="home-projects__grid">
          <ProjectCard title={projects[0].title} description={projects[0].description} image={projects[0].image} />
          <ProjectCard title={projects[1].title} description={projects[1].description} image={projects[1].image} />
          <ProjectCard title={projects[2].title} description={projects[2].description} image={projects[2].image} />
        </div>
      </section>

      {/* ── 2b. TODOS LOS PROYECTOS ── */}
      <section className="home-section all-projects" ref={allProjectsRef}>
        <div className="all-projects__grid">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className="ap-card reveal"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="ap-card__img-wrap">
                <img src={p.image} alt={p.title} className="ap-card__img" loading="lazy" />
              </div>
              <div className="ap-card__body">
                <h3 className="ap-card__title">{p.title}</h3>
                <p className="ap-card__desc">{p.description}</p>
                {(p.video || p.modalImage) && (
                  <button className="ap-card__btn" onClick={() => openModal(p.id)}>
                    {p.video ? t('projects.viewVideo') : t('projects.viewImage')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. HABILIDADES ── */}
      <section id="habilidades" className="home-section home-skills" ref={skillsRef}>
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="skills-intro">{t('skills.intro')}</p>
        <div className="skills-grid">
          {(() => {
            let fi = 0;
            return skillCategories.map((cat) => (
              <div
                key={cat.key}
                className={`skill-card${cat.key === 'ai' ? ' skill-card--wide' : ''}`}
              >
                <h3 className="skill-card__title">{cat.title}</h3>
                <div className="skill-card__bars">
                  {cat.skills.map((skill) => {
                    const idx = fi++;
                    return (
                      <div key={skill.name} className="skill-bar2">
                        <div className="skill-bar2__header">
                          <span className="skill-bar2__label">{skill.name}</span>
                          <span
                            className="skill-bar2__pct"
                            ref={el => { pctRefs.current[idx] = el; }}
                          >10%</span>
                        </div>
                        <div className="skill-bar2__track">
                          <div
                            className="skill-bar2__fill"
                            ref={el => { fillRefs.current[idx] = el; }}
                            style={{ width: '10%' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* ── 4. EXPERIENCIA TIMELINE ── */}
      <section id="experiencia" className="home-section home-timeline">
        <h2 className="section-title">{t('home.experienceSection')}</h2>
        <div className="timeline">
          {timelineItems.map((item, idx) => (
            <div key={idx} className={`timeline__item ${idx % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}>
              <div className="timeline__panel">
                <span className="timeline__date">{item.period}</span>
                <strong className="timeline__company">{item.company}</strong>
                <span className="timeline__role">{item.role}</span>
                <p className="timeline__desc">{item.description}</p>
              </div>
              <span className="timeline__dot" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. CONTACTO ── */}
      <section id="contacto" className="home-section home-contact">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="home-contact__desc">{t('contact.description')}</p>
        <div className="home-contact__grid">
          <a className="contact-card" href={`mailto:${EMAIL}`} aria-label="Enviar correo electrónico">
            <img src={imgEmail} alt="" className="contact-card__icon" aria-hidden="true" />
            <div className="contact-card__text">
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value">{EMAIL}</span>
            </div>
          </a>

          <a className="contact-card" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Abrir chat de WhatsApp">
            <img src={imgWhatsapp} alt="" className="contact-card__icon" aria-hidden="true" />
            <div className="contact-card__text">
              <span className="contact-card__label">WhatsApp</span>
              <span className="contact-card__value">{WHATSAPP_DISPLAY}</span>
            </div>
          </a>

          {/* TODO: agregar URL de LinkedIn */}
          <a className="contact-card" href="#" aria-label="Perfil de LinkedIn">
            <svg className="contact-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.351V9H12.765V10.561H12.814C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z"/>
            </svg>
            <div className="contact-card__text">
              <span className="contact-card__label">LinkedIn</span>
              <span className="contact-card__value">Juan Sebastián Carrera</span>
            </div>
          </a>

          {/* TODO: agregar URL de GitHub */}
          <a className="contact-card" href="#" aria-label="Perfil de GitHub">
            <svg className="contact-card__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"/>
            </svg>
            <div className="contact-card__text">
              <span className="contact-card__label">GitHub</span>
              <span className="contact-card__value">sebascarreramoya</span>
            </div>
          </a>
        </div>
      </section>

      {/* ── MODAL ── */}
      {activeProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Cerrar">✕</button>

            {/* Full-width media */}
            <div className="modal-media">
              {activeProject.video ? (
                <video controls autoPlay className="modal-media__video">
                  <source src={activeProject.video} type="video/mp4" />
                  {t('common.noVideoSupport')}
                </video>
              ) : activeProject.modalImage ? (
                <img src={activeProject.modalImage} alt={activeProject.title} className="modal-media__img" />
              ) : null}
            </div>

            {/* Project details */}
            <div className="modal-body">
              <h2 className="modal-title">{activeProject.title}</h2>

              <div className="modal-cols">
                {/* Left: problem + solution */}
                <div className="modal-col-main">
                  {activeProject.problem && (
                    <div>
                      <p className="modal-section__heading">{t('projects.modal.problem')}</p>
                      <p className="modal-section__text">{activeProject.problem}</p>
                    </div>
                  )}
                  {activeProject.solution && (
                    <div>
                      <p className="modal-section__heading">{t('projects.modal.solution')}</p>
                      <p className="modal-section__text">{activeProject.solution}</p>
                    </div>
                  )}
                </div>

                {/* Right: stack badges */}
                {Array.isArray(activeProject.stack) && activeProject.stack.length > 0 && (
                  <div>
                    <p className="modal-section__heading">{t('projects.modal.stack')}</p>
                    <div className="modal-stack-badges">
                      {activeProject.stack.map((tech) => (
                        <span key={tech} className="modal-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {activeProject.link && !activeProject.link.includes('github.com/tuusuario') && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-live-btn"
                >
                  {t('projects.modal.liveCta')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Home;
