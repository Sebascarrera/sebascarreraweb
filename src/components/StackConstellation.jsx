import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './StackConstellation.css';

/* Proyectos por categoría (cifras del autor; la cuenta sigue subiendo, por eso llevan "+"). */
const COUNTS = { ai: 48, code: 90, design: 185, video: 65, method: 500 };
const CATS = ['ai', 'code', 'design', 'video', 'method'];

/* [clave, categorías]. La primera categoría define dónde se dibuja el nodo. */
const TOOLS = [
  ['copilot', ['ai']], ['codex', ['ai']], ['heygen', ['ai']], ['elevenlabs', ['ai']], ['midjourney', ['ai']], ['runway', ['ai']], ['envato', ['ai']],
  ['html5', ['code']], ['css3', ['code']], ['js', ['code']], ['react', ['code']], ['wordpress', ['code']],
  ['components', ['code']], ['responsive', ['code']], ['performance', ['code']], ['a11y', ['code']],
  ['figma', ['design']], ['sketch', ['design']], ['xd', ['design']], ['photoshop', ['design']], ['illustrator', ['design']],
  ['ae', ['design', 'video']], ['premiere', ['video']], ['production', ['video']], ['motion', ['video']],
  ['git', ['method']], ['scrum', ['method']], ['seo', ['method']], ['deploy', ['method']],
];
const STEPS = [['idea', 'method'], ['design', 'design'], ['dev', 'code'], ['motion', 'ai'], ['live', 'method']];
const RGB = { ai: '94, 234, 160', code: '0, 212, 200', design: '167, 139, 250', video: '255, 180, 84', method: '233, 240, 243' };

const CX = 320, CY = 270, R = 170;

function layout() {
  const cat = {};
  CATS.forEach((k, i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    cat[k] = { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), a };
  });
  const tool = {};
  CATS.forEach((k) => {
    const list = TOOLS.filter((t) => t[1][0] === k);
    const n = list.length;
    const spread = Math.min(Math.PI * 1.25, 0.5 + n * 0.3);
    const r = 66 + Math.min(n, 9) * 5;
    list.forEach((t, j) => {
      const a = cat[k].a + (n === 1 ? 0 : (j / (n - 1) - 0.5) * spread);
      tool[t[0]] = {
        x: Math.max(34, Math.min(606, cat[k].x + r * Math.cos(a))),
        y: Math.max(22, Math.min(518, cat[k].y + r * Math.sin(a))),
        c: k,
      };
    });
  });
  return { cat, tool };
}

export default function StackConstellation({ locale }) {
  const { t } = useTranslation();
  const [cur, setCur] = useState('design');
  const [curTool, setCurTool] = useState(null);
  const hovRef = useRef(false);
  const curRef = useRef(cur);
  curRef.current = cur;
  const dotRefs = useRef([]);
  const { cat, tool } = useMemo(layout, []);
  const fmt = (n) => n.toLocaleString(locale);
  const label = (k) => t(`stackMap.cats.${k}.label`);

  const pick = (k, tl = null) => { setCur(k); setCurTool(tl); };

  const dots = useMemo(() => CATS.flatMap((k) => [0, 1].map((j) => ({ k, t0: j / 2, s: 0.12 + ((j + CATS.indexOf(k)) % 3) * 0.015 }))), []);

  /* Pulsos de energía categoría → centro, y rotación automática */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = dots.map((d) => d.t0);
    let raf = 0;
    let last = performance.now();
    const loop = (ts) => {
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      dots.forEach((d, i) => {
        const el = dotRefs.current[i];
        if (!el) return;
        if (!reduce) state[i] = (state[i] + d.s * dt * (d.k === curRef.current ? 2 : 1)) % 1;
        const p = cat[d.k];
        el.setAttribute('cx', CX + (p.x - CX) * state[i]);
        el.setAttribute('cy', CY + (p.y - CY) * state[i]);
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const id = reduce ? 0 : setInterval(() => {
      if (hovRef.current) return;
      setCur((c) => CATS[(CATS.indexOf(c) + 1) % CATS.length]);
      setCurTool(null);
    }, 4500);
    return () => { cancelAnimationFrame(raf); clearInterval(id); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* La energía debe acelerar en la categoría activa sin reiniciar el efecto */
  const activeDot = (k) => (k === cur ? 1 : 0.35);

  const list = TOOLS.filter((x) => x[1].includes(cur));
  const sel = curTool && TOOLS.find((x) => x[0] === curTool);
  const nCur = COUNTS[cur];

  return (
    <div className="sm">
      <div className="sm__filters" role="group" aria-label={t('stackMap.ui.aria')}>
        {CATS.map((k) => (
          <button key={k} type="button" className="sm__f" data-c={k} aria-pressed={cur === k} onClick={() => { hovRef.current = true; pick(k); }}>
            <i />{label(k)} <b>{fmt(COUNTS[k])}+</b>
          </button>
        ))}
      </div>

      <div className="sm__main" data-c={cur}>
        <div className="sm__graph">
          <svg viewBox="0 0 640 540" role="img" aria-label={t('stackMap.ui.graphAria')}>
            {CATS.map((k) => (
              <line key={k} x1={CX} y1={CY} x2={cat[k].x} y2={cat[k].y} stroke={`rgb(${RGB[k]})`} strokeWidth={k === cur ? 1.8 : 1.2} strokeOpacity={k === cur ? 0.8 : 0.18} />
            ))}
            {TOOLS.map(([key, cats]) => {
              const p = tool[key];
              const on = cats.includes(cur);
              const isSel = key === curTool;
              return (
                <g
                  key={key}
                  className="sm__node"
                  tabIndex={0}
                  style={{ opacity: on ? 1 : 0.22 }}
                  onPointerEnter={() => { hovRef.current = true; pick(on ? cur : p.c, key); }}
                  onPointerLeave={() => { hovRef.current = false; }}
                  onClick={() => pick(on ? cur : p.c, key)}
                  onFocus={() => pick(on ? cur : p.c, key)}
                >
                  <line x1={cat[p.c].x} y1={cat[p.c].y} x2={p.x} y2={p.y} stroke={`rgb(${RGB[p.c]})`} strokeOpacity="0.25" />
                  <circle cx={p.x} cy={p.y} r={isSel ? 8.5 : 6} fill={`rgba(${RGB[p.c]}, ${isSel ? 0.8 : 0.28})`} stroke={`rgb(${RGB[p.c]})`} strokeWidth="1.3" />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" style={{ opacity: on ? 1 : 0 }}>{t(`stackMap.tools.${key}.short`, { defaultValue: t(`stackMap.tools.${key}.name`) })}</text>
                </g>
              );
            })}
            <line x1={cat.video.x} y1={cat.video.y} x2={tool.ae.x} y2={tool.ae.y} stroke={`rgb(${RGB.video})`} strokeDasharray="3 3" strokeOpacity={cur === 'video' ? 0.8 : 0.12} />
            {dots.map((d, i) => (
              <circle key={i} ref={(el) => { dotRefs.current[i] = el; }} r="2.4" fill={`rgb(${RGB[d.k]})`} opacity={activeDot(d.k)} />
            ))}
            <g>
              <circle cx={CX} cy={CY} r="34" fill="#0a141b" stroke="rgb(0,212,200)" strokeWidth="1.5" />
              <rect x={CX - 14} y={CY - 14} width="28" height="28" rx="5" fill="none" stroke="rgba(0,212,200,.7)" />
              <text x={CX} y={CY + 4} textAnchor="middle" className="sm__ctr">JSCM</text>
            </g>
            {CATS.map((k) => {
              const p = cat[k];
              const on = k === cur;
              const rad = 22 + (COUNTS[k] / 500) * 16;
              return (
                <g
                  key={k}
                  className="sm__node sm__cat"
                  tabIndex={0}
                  onPointerEnter={() => { hovRef.current = true; pick(k); }}
                  onPointerLeave={() => { hovRef.current = false; }}
                  onClick={() => pick(k)}
                  onFocus={() => pick(k)}
                >
                  <circle cx={p.x} cy={p.y} r={rad} fill={`rgba(${RGB[k]}, ${on ? 0.3 : 0.1})`} stroke={`rgb(${RGB[k]})`} strokeWidth="1.5" />
                  <text x={p.x} y={p.y - 1} textAnchor="middle" style={{ fill: `rgb(${RGB[k]})` }}>{t(`stackMap.cats.${k}.short`)}</text>
                  <text x={p.x} y={p.y + 12} textAnchor="middle" className="sm__num">{fmt(COUNTS[k])}+</text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="sm__panel" key={`${cur}-${curTool}`} aria-live="polite">
          <span className="sm__tag">{label(cur)}</span>
          <div className="sm__big"><b>{fmt(nCur)}+</b><span>{t(`stackMap.cats.${cur}.unit`)}<em>{t('stackMap.ui.growing')}</em></span></div>
          <h3>{sel ? t(`stackMap.tools.${sel[0]}.name`) : label(cur)}</h3>
          <p>{sel ? t('stackMap.ui.toolText', { n: fmt(nCur), cat: label(cur) }) : t(`stackMap.cats.${cur}.desc`)}</p>
          <div className="sm__rows">
            {list.map(([key]) => (
              <button key={key} type="button" className={`sm__row${key === curTool ? ' on' : ''}`} onClick={() => setCurTool(curTool === key ? null : key)}>
                <span>{t(`stackMap.tools.${key}.name`)}</span>
                <span className="sm__bar"><i /></span>
                <span className="sm__cnt">{fmt(nCur)}+</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <p className="sm__pipe-title">{t('stackMap.ui.pipeTitle')}</p>
      <div className="sm__pipe">
        {STEPS.map(([key, c], i) => (
          <div key={key} className="sm__step" data-c={c}>
            <span className="sm__tag">{String(i + 1).padStart(2, '0')}</span>
            <b>{t(`stackMap.steps.${key}.title`)}</b>
            <span>{t(`stackMap.steps.${key}.text`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
