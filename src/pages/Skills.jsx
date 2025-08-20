import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/skills.css';

function Skills() {
  const { t } = useTranslation();
  const categories = t('skills.categories', { returnObjects: true });

  return (
    <section className="skills-container">
      <div className="skills-overlay">
        <h2>{t('skills.title')}</h2>
        <p className="skills-intro">{t('skills.intro')}</p>
        <div className="skills-grid">
          {Object.values(categories).map((skill, index) => (
            <div className="skill-card reveal" key={index}>
              <h3>{skill.title}</h3>
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
