import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './StatsStrip.css';

const CAREER_START_YEAR = 2015;

function Counter({ to, locale }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setVal(to); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const D = 1600;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / D);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <span ref={ref}>{val.toLocaleString(locale)}</span>;
}

function StatsStrip() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith('en') ? 'en-US' : 'es-CO';
  const years = new Date().getFullYear() - CAREER_START_YEAR;
  const items = [
    { to: years, plus: true, label: t('stats.years') },
    { to: 60, plus: true, label: t('stats.projects') },
    { to: 10000, plus: true, label: t('stats.reach') },
    { to: 4, plus: false, label: t('stats.sectors') },
  ];

  return (
    <section className="stats" aria-label={t('stats.aria')}>
      <div className="stats__grid">
        {items.map((it, i) => (
          <div key={i} className="stats__item scroll-reveal" style={{ '--reveal-delay': `${i * 120}ms` }}>
            <span className="stats__value">
              <Counter to={it.to} locale={locale} />{it.plus ? '+' : ''}
            </span>
            <span className="stats__label">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsStrip;
