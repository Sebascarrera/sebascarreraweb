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


/* ── Hero flow nodes ── */
const LEFT_NODES = [
  { key: 'frontend', label: 'Frontend Dev' },
  { key: 'design',   label: 'Diseño UI/UX' },
  { key: 'react',    label: 'React · JS' },
  { key: 'motion',   label: 'Motion & Video' },
];
const RIGHT_NODES = [
  { key: 'web',   label: 'Sitios Web' },
  { key: 'games', label: 'Juegos' },
  { key: 'exp',   label: 'Experiencias' },
  { key: 'apps',  label: 'Apps & Demos' },
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

  /* ── Hero flow canvas ── */
  const heroRef        = useRef(null);
  const flowCanvasRef  = useRef(null);
  const heroLogoRef    = useRef(null);
  const leftNodeRefs   = useRef([]);
  const rightNodeRefs  = useRef([]);

  useEffect(() => {
    const canvas = flowCanvasRef.current;
    const hero   = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');

    function bezier(t, p0, p1, p2, p3) {
      const u = 1 - t;
      return {
        x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
        y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y,
      };
    }

    const MERGE_DIST = 100; // px from hub center where lines converge
    let pathData = null;

    function buildPaths() {
      const logoEl = heroLogoRef.current;
      if (!logoEl) return null;
      const hr = hero.getBoundingClientRect();
      const lr = logoEl.getBoundingClientRect();

      const hubCx = lr.left - hr.left + lr.width  / 2;
      const hubCy = lr.top  - hr.top  + lr.height / 2;

      // Lines stop MERGE_DIST px from center on each side
      const leftMerge  = { x: hubCx - MERGE_DIST, y: hubCy };
      const rightMerge = { x: hubCx + MERGE_DIST, y: hubCy };

      function makePath(sx, sy, ex, ey, baseSpd, nodePos) {
        const tx = (ex - sx) * 0.44;
        return {
          p0: { x: sx, y: sy },
          p1: { x: sx + tx, y: sy },
          p2: { x: ex - tx, y: ey },
          p3: { x: ex, y: ey },
          nodePos, // actual node position for junction dot
          dots: [
            { t: 0,    spd: baseSpd },
            { t: 0.34, spd: baseSpd },
            { t: 0.67, spd: baseSpd },
          ],
        };
      }

      // All 4 left paths converge to leftMerge
      const left = leftNodeRefs.current.map((el, i) => {
        if (!el) return null;
        const r  = el.getBoundingClientRect();
        const sx = r.right - hr.left;
        const sy = r.top   - hr.top + r.height / 2;
        return makePath(sx, sy, leftMerge.x, leftMerge.y, 0.14 + i * 0.025, { x: sx, y: sy });
      }).filter(Boolean);

      // All 4 right paths fan out from rightMerge
      const right = rightNodeRefs.current.map((el, i) => {
        if (!el) return null;
        const r  = el.getBoundingClientRect();
        const ex = r.left - hr.left;
        const ey = r.top  - hr.top + r.height / 2;
        return makePath(rightMerge.x, rightMerge.y, ex, ey, 0.13 + i * 0.025, { x: ex, y: ey });
      }).filter(Boolean);

      return { paths: [...left, ...right], merges: [leftMerge, rightMerge] };
    }

    function resize() {
      canvas.width  = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      pathData = buildPaths();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    let animRaf = 0;
    let lastTs  = performance.now();
    let time    = 0;
    const ACCENT     = '0, 212, 200';
    const TAIL_STEPS = 7;

    function loop(ts) {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      time  += dt;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!pathData) { animRaf = requestAnimationFrame(loop); return; }
      const { paths, merges } = pathData;

      for (const path of paths) {
        /* ── Outer glow trace ── */
        ctx.beginPath();
        ctx.moveTo(path.p0.x, path.p0.y);
        ctx.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
        ctx.strokeStyle = `rgba(${ACCENT}, 0.05)`;
        ctx.lineWidth   = 5;
        ctx.stroke();

        /* ── Inner crisp trace ── */
        ctx.beginPath();
        ctx.moveTo(path.p0.x, path.p0.y);
        ctx.bezierCurveTo(path.p1.x, path.p1.y, path.p2.x, path.p2.y, path.p3.x, path.p3.y);
        ctx.strokeStyle = `rgba(${ACCENT}, 0.14)`;
        ctx.lineWidth   = 1;
        ctx.stroke();

        /* ── Node-end junction dot ── */
        const np     = path.nodePos;
        const npulse = 0.5 + 0.5 * Math.sin(time * 2.8 + np.x * 0.01);
        ctx.beginPath();
        ctx.arc(np.x, np.y, 2.2 + npulse * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${(0.38 + npulse * 0.42).toFixed(2)})`;
        ctx.fill();

        /* ── Travelling dots with comet tail ── */
        for (const dot of path.dots) {
          dot.t = (dot.t + dot.spd * dt) % 1;

          for (let j = 1; j <= TAIL_STEPS; j++) {
            const tt = ((dot.t - j * 0.030 + 1) % 1);
            const tp = bezier(tt, path.p0, path.p1, path.p2, path.p3);
            const a  = (1 - j / (TAIL_STEPS + 1)) * 0.42;
            const r  = Math.max(0.3, 2.0 * (1 - j / (TAIL_STEPS + 1)));
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT}, ${a.toFixed(3)})`;
            ctx.fill();
          }

          const pos = bezier(dot.t, path.p0, path.p1, path.p2, path.p3);

          const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 8);
          grd.addColorStop(0,   `rgba(${ACCENT}, 0.80)`);
          grd.addColorStop(0.4, `rgba(${ACCENT}, 0.28)`);
          grd.addColorStop(1,   `rgba(${ACCENT}, 0)`);
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ACCENT}, 1)`;
          ctx.fill();
        }
      }

      /* ── Merge-point pulses (left and right) ── */
      const hp = 0.5 + 0.5 * Math.sin(time * 2.5);
      for (const merge of merges) {
        for (let ring = 0; ring < 3; ring++) {
          const r = 10 + hp * 11 + ring * 15;
          const a = Math.max(0, (0.16 - ring * 0.045) * (0.5 + hp * 0.5));
          const g = ctx.createRadialGradient(merge.x, merge.y, 0, merge.x, merge.y, r);
          g.addColorStop(0.4, `rgba(${ACCENT}, ${a.toFixed(3)})`);
          g.addColorStop(1,   `rgba(${ACCENT}, 0)`);
          ctx.beginPath();
          ctx.arc(merge.x, merge.y, r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(merge.x, merge.y, 3.5 + hp * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${(0.55 + hp * 0.45).toFixed(2)})`;
        ctx.fill();
      }

      animRaf = requestAnimationFrame(loop);
    }

    animRaf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animRaf); ro.disconnect(); };
  }, []);

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
      <section className="hero" ref={heroRef}>

        {/* Left flow nodes */}
        <div className="hero__flow-col hero__flow-left">
          {LEFT_NODES.map((n, i) => (
            <div key={n.key} ref={el => { leftNodeRefs.current[i] = el; }} className="hero__flow-node">
              <span className="hero__fn-label">{n.label}</span>
              <span className="hero__fn-dot" />
            </div>
          ))}
        </div>

        {/* Center: logo as floating background + text on top */}
        <div className="hero__center" ref={heroLogoRef}>
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
          <div className="hero__text">
            <h1 className="hero__name">{t('home.name')}</h1>
            <p className="hero__subtitle">{t('home.subtitle')}</p>
            <p className="hero__desc">{t('home.description')}</p>
            <div className="hero__ctas">
              <a href="#proyectos" className="btn-primary">{t('home.viewProjects')}</a>
              <Link to="/selector" className="btn-ghost">{t('home.experienceCta')}</Link>
            </div>
          </div>
        </div>

        {/* Right flow nodes */}
        <div className="hero__flow-col hero__flow-right">
          {RIGHT_NODES.map((n, i) => (
            <div key={n.key} ref={el => { rightNodeRefs.current[i] = el; }} className="hero__flow-node">
              <span className="hero__fn-dot" />
              <span className="hero__fn-label">{n.label}</span>
            </div>
          ))}
        </div>

        {/* Flow canvas overlay */}
        <canvas ref={flowCanvasRef} className="hero__flow-canvas" />
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
          {t('timeline.items', { returnObjects: true }).map((item, idx) => (
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
