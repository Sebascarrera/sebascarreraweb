import React from 'react';
import '../styles/skills.css';

const skills = [
  { category: 'Lenguajes & Tecnologías', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'WordPress'] },
  { category: 'Diseño & UI/UX', items: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects'] },
  { category: 'Desarrollo Front-End', items: ['Componentes reutilizables', 'Diseño responsivo', 'Optimización de rendimiento', 'Accesibilidad (A11y)'] },
  { category: 'Producción Audiovisual', items: ['Premiere Pro', 'After Effects', 'Realización audiovisual', 'Motion Graphics'] },
  { category: 'Herramientas & Metodologías', items: ['Git', 'SCRUM', 'SEO técnico básico', 'Deployment con Vite'] },
  { category: 'Soft Skills', items: ['Liderazgo de proyectos', 'Comunicación efectiva', 'Pensamiento creativo', 'Gestión del tiempo'] },
];

function Skills() {
  return (
    <section className="skills-container">
      <div className="skills-overlay">
        <h2>Habilidades Profesionales</h2>
        <p className="skills-intro">
          Como diseñador y desarrollador web front-end, combino creatividad y precisión técnica para construir experiencias digitales impactantes.
        </p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card reveal" key={index}>
              <h3>{skill.category}</h3>
              <ul>
                {skill.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
