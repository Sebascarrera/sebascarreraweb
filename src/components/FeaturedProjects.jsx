import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FeaturedProjects.css';

/* Orden de aparición: lo más reciente primero; la edición 2025 queda más abajo. */
const ORDER = [11, 12, 10, 8, 7, 3, 2, 9, 1, 6, 4, 5];
const CAT = { 11: 'exp', 12: 'design', 10: 'design', 8: 'games', 7: 'exp', 3: 'games', 2: 'exp', 9: 'video', 1: 'exp', 6: 'games', 4: 'games', 5: 'video' };
const FILTERS = ['all', 'games', 'exp', 'design', 'video'];
const FILTER_CAT = { all: 'dev', games: 'dev', exp: 'exp', design: 'design', video: 'video' };

/* Filas del mosaico en proporción áurea: 7/5, 5/7 y luego tercios. */
function spanFor(i, total) {
  if (total === 1) return 12;
  if (i < 4) return [7, 5, 5, 7][i];
  const rest = total - 4;
  const k = i - 4;
  const lastRow = rest - (rest % 3);
  if (k >= lastRow) {
    const rem = rest % 3;
    return rem === 1 ? 12 : 6;
  }
  return 4;
}

export default function FeaturedProjects({ projects, reach, liveUrl, locale, onOpen }) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [cur, setCur] = useState(ORDER[0]);
  const caseRef = useRef(null);

  /* Al elegir un proyecto, sube suavemente al visor para que se note el cambio. */
  const selectProject = (id) => {
    setCur(id);
    const el = caseRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const items = useMemo(() => {
    const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
    return ORDER.filter((id) => byId[id]).map((id, idx) => ({
      ...byId[id],
      idx,
      cat: CAT[id],
      tag: t(`projects.cases.${id}.tag`),
      client: t(`projects.cases.${id}.client`, { defaultValue: '' }),
      title: t(`projects.cases.${id}.title`),
      problem: t(`projects.cases.${id}.problem`),
      solution: t(`projects.cases.${id}.solution`),
      stack: t(`projects.cases.${id}.stack`, { returnObjects: true }),
    }));
  }, [projects, t]);

  const visible = items.filter((p) => filter === 'all' || p.cat === filter);
  const current = visible.find((p) => p.id === cur) || visible[0];
  const fmt = (n) => n.toLocaleString(locale);
  const count = (f) => (f === 'all' ? items.length : items.filter((p) => p.cat === f).length);

  const pickFilter = (f) => {
    setFilter(f);
    const list = items.filter((p) => f === 'all' || p.cat === f);
    if (!list.some((p) => p.id === cur)) setCur(list[0].id);
  };

  const openCurrent = () => {
    if (liveUrl && current.id === 11) return;
    onOpen(current.id);
  };

  return (
    <div className="fp">
      <h2 className="section-title scroll-reveal">{t('projects.title')}</h2>
      <p className="fp__sub scroll-reveal" style={{ '--reveal-delay': '120ms' }}>{t('projects.cases.subtitle')}</p>

      <div className="fp__filters" role="group" aria-label={t('projects.cases.ui.aria')}>
        {FILTERS.map((f) => (
          <button key={f} type="button" className="fp__f" data-cat={FILTER_CAT[f]} aria-pressed={filter === f} onClick={() => pickFilter(f)}>
            <i />{t(`projects.cases.ui.filters.${f}`)} <b>{count(f)}</b>
          </button>
        ))}
      </div>

      <article className="fp__case" ref={caseRef} data-cat={current.cat} aria-live="polite">
        <div className="fp__img">
          <span className="fp__num">{String(current.idx + 1).padStart(2, '0')}</span>
          <img key={current.id} src={current.image} alt={current.title} />
        </div>
        <div className="fp__body" key={`b${current.id}`}>
          <span className="fp__tag">{current.tag}</span>
          {current.client && (
            <span className="fp__client">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg>
              {t('projects.cases.ui.intl')} · <b>{current.client}</b>
            </span>
          )}
          <h3 className="fp__title">{current.title}</h3>
          {reach[current.id] && (
            <div className="fp__reach">
              <b>+{fmt(reach[current.id])}</b>
              <span>{t('projects.cases.ui.reached')}</span>
            </div>
          )}
          <div className="fp__blk"><h4>{t('projects.cases.ui.challenge')}</h4><p>{current.problem}</p></div>
          <div className="fp__blk"><h4>{t('projects.cases.ui.solution')}</h4><p>{current.solution}</p></div>
          {Array.isArray(current.stack) && (
            <div className="fp__stack">{current.stack.map((s) => <span key={s}>{s}</span>)}</div>
          )}
          {current.id === 11 && liveUrl ? (
            <a className="fp__cta" href={liveUrl} target="_blank" rel="noopener noreferrer">{t('projects.cases.ui.ctaLive')} →</a>
          ) : (current.video || current.modalImage || current.gallery) && (
            <button type="button" className="fp__cta" onClick={openCurrent}>
              {current.video ? t('projects.viewVideo') : current.gallery ? t('projects.viewGallery') : t('projects.viewImage')} →
            </button>
          )}
        </div>
      </article>

      {visible.length > 1 && (
        <>
          <div className="fp__mosaic">
            {visible.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`fp__card${p.id === current.id ? ' is-on' : ''}`}
                data-cat={p.cat}
                style={{ gridColumn: `span ${spanFor(i, visible.length)}` }}
                onClick={() => selectProject(p.id)}
                aria-label={p.title}
              >
                <img src={p.image} alt="" loading="lazy" />
                <span className="fp__ctag">{p.client ? t('projects.cases.ui.intl') : p.tag}</span>
                {reach[p.id] && <span className="fp__creach">+{fmt(reach[p.id])}</span>}
                <span className="fp__cin"><span className="fp__ct">{p.title}</span><span className="fp__cp">{p.problem}</span></span>
              </button>
            ))}
          </div>
          <p className="fp__hint">{t('projects.cases.ui.hint')}</p>
        </>
      )}
    </div>
  );
}
