import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/skills.css';

function Skills() {
  const { t } = useTranslation();
  const categories = t('skills.categories', { returnObjects: true });

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="skills-container">
      <div className="skills-overlay">
        <h2 className="reveal">{t('skills.title')}</h2>
        <p className="skills-intro reveal">{t('skills.intro')}</p>
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
