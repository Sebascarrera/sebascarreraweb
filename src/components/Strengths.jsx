import React from 'react';
import { useTranslation } from 'react-i18next';
import './Strengths.css';

const svg = (children) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const ITEMS = [
  { key: 'craft', cat: 'dev', icon: svg(<><polyline points="4.5,5 1,8 4.5,11" /><polyline points="11.5,5 15,8 11.5,11" /><line x1="9.5" y1="2.5" x2="6.5" y2="13.5" /></>) },
  { key: 'ai', cat: 'ai', icon: svg(<><path d="M8 1.5l1.3 3.6 3.7 1.3-3.7 1.3L8 11.3 6.7 7.7 3 6.4l3.7-1.3z" /><path d="M12.5 10.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" /></>) },
  { key: 'lead', cat: 'lead', icon: svg(<><circle cx="8" cy="4.5" r="2" /><circle cx="3" cy="11.5" r="1.7" /><circle cx="13" cy="11.5" r="1.7" /><path d="M8 6.5v2.2M8 8.7L4 10.2M8 8.7l4 1.5" /></>) },
  { key: 'vision', cat: 'out', icon: svg(<><circle cx="8" cy="8" r="6" /><circle cx="8" cy="8" r="2.4" /><path d="M8 2v2M8 12v2M2 8h2M12 8h2" /></>) },
];

export default function Strengths() {
  const { t } = useTranslation();
  return (
    <section className="strengths" aria-label={t('strengths.aria')}>
      <div className="strengths__grid">
        {ITEMS.map((it) => (
          <article key={it.key} className="strength" data-cat={it.cat} tabIndex={0}>
            <span className="strength__ico">{it.icon}</span>
            <span className="strength__tag">{t(`strengths.items.${it.key}.tag`)}</span>
            <h3 className="strength__title">{t(`strengths.items.${it.key}.title`)}</h3>
            <p className="strength__text">{t(`strengths.items.${it.key}.text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
