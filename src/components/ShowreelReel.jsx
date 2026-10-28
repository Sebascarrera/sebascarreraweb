import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ShowreelReel.css';

const svg = (children) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const CATS = [
  { key: 'games', cat: 'dev', icon: svg(<><rect x="1.8" y="4.5" width="12.4" height="7" rx="3" /><path d="M5 6.5v3M3.5 8h3M10.5 7.2h.01M12 8.8h.01" /></>) },
  { key: 'exp', cat: 'out', icon: svg(<path d="M8 2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.2 4.4 13.1l.7-4L2.2 6.3l4-.6z" />) },
  { key: 'web', cat: 'design', icon: svg(<><circle cx="8" cy="8" r="6" /><path d="M2 8h12M8 2c2 1.8 2.8 3.8 2.8 6S10 12.2 8 14M8 2C6 3.8 5.2 5.8 5.2 8S6 12.2 8 14" /></>) },
  { key: 'motion', cat: 'motion', icon: svg(<><rect x="2" y="3" width="12" height="10" rx="2" /><path d="M6.8 6l3.2 2-3.2 2z" /></>) },
];

export default function ShowreelReel({ src }) {
  const { t } = useTranslation();
  const [on, setOn] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setOn((i) => (i + 1) % CATS.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="reel">
      <div className="reel__frame">
        <i className="reel__corner reel__corner--tl" /><i className="reel__corner reel__corner--tr" />
        <i className="reel__corner reel__corner--bl" /><i className="reel__corner reel__corner--br" />
        <div className="reel__hud">
          <span className="reel__rec"><i />{t('home.showreel.rec')}</span>
          <span className="reel__now">{t(`home.showreel.cats.${CATS[on].key}.title`)}</span>
        </div>
        <video className="reel__video" src={src} controls muted loop playsInline preload="none">
          {t('common.noVideoSupport')}
        </video>
      </div>
      <div className="reel__list">
        {CATS.map((c, i) => (
          <div
            key={c.key}
            className={`reel__card${on === i ? ' is-on' : ''}`}
            data-cat={c.cat}
            tabIndex={0}
            onPointerEnter={() => { setPaused(true); setOn(i); }}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => { setPaused(true); setOn(i); }}
            onBlur={() => setPaused(false)}
          >
            <span className="reel__ico">{c.icon}</span>
            <span className="reel__tag">{t(`home.showreel.cats.${c.key}.tag`)}</span>
            <span className="reel__ttl">{t(`home.showreel.cats.${c.key}.title`)}</span>
            <span className="reel__sub">{t(`home.showreel.cats.${c.key}.text`)}</span>
            <span className="reel__bar"><i key={on === i ? 'on' : 'off'} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
