import React from 'react';
import './ProjectCard.css';

function ProjectCard({ image, title, description, link }) {
  return (
    <article className="project-card">
      <div className="project-card__image-wrap">
        {image
          ? <img src={image} alt={title} className="project-card__image" loading="lazy" />
          : <div className="project-card__image-placeholder" />
        }
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        {link && (
          <a href={link} className="project-card__link" target="_blank" rel="noopener noreferrer">
            Ver proyecto →
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
