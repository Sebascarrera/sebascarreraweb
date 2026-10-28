import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CareerMap.css';

/* Fechas de cada etapa: [año, mes]; e = null significa "hasta hoy". */
const STAGES = [
  { id: 'moya', cat: 'design', s: [2010, 10], e: [2016, 3] },
  { id: 'sing', cat: 'design', s: [2012, 12], e: [2015, 4] },
  { id: 'imp', cat: 'lead', s: [2016, 4], e: [2022, 1] },
  { id: 'free', cat: 'dev', s: [2022, 1], e: null },
  { id: 'men', cat: 'design', s: [2024, 9], e: null },
];
const FIRST = [2010, 10];
const LEAD_START = [2016, 4];
const Y0 = 2010;

const nowYear = (now) => now.getFullYear() + now.getMonth() / 12 + now.getDate() / 365;
const tOf = (a, now) => (a ? a[0] + (a[1] - 1) / 12 : nowYear(now));
const monthsOf = (st, now) => {
  const s = st.s[0] * 12 + st.s[1] - 1;
  const e = st.e ? st.e[0] * 12 + st.e[1] - 1 : now.getFullYear() * 12 + now.getMonth();
  return e - s;
};
const overlap = (a, b, now) => Math.min(tOf(a.e, now), tOf(b.e, now)) - Math.max(tOf(a.s, now), tOf(b.s, now)) > 0.2;

export default function CareerMap({ locale }) {
  const { t } = useTranslation();
  const now = useMemo(() => new Date(), []);
  const Y1 = now.getFullYear() + 1;
  const pct = (v) => ((v - Y0) / (Y1 - Y0)) * 100;
  const [cur, setCur] = useState('imp');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setCur((c) => STAGES[(STAGES.findIndex((x) => x.id === c) + 1) % STAGES.length].id), 4500);
    return () => clearInterval(id);
  }, [paused]);

  const months = t('career.ui.months', { returnObjects: true });
  const period = (st) => `${months[st.s[1] - 1]} ${st.s[0]} – ${st.e ? `${months[st.e[1] - 1]} ${st.e[0]}` : t('career.ui.present')}`;
  const durText = (st) => {
    const m = monthsOf(st, now);
    const y = Math.floor(m / 12);
    const r = m % 12;
    const parts = [];
    if (y) parts.push(`${y} ${t(y === 1 ? 'career.ui.year' : 'career.ui.years')}`);
    if (r) parts.push(`${r} ${t(r === 1 ? 'career.ui.month' : 'career.ui.monthsWord')}`);
    return parts.join(' ') || `1 ${t('career.ui.month')}`;
  };
  const durBig = (st) => {
    const m = monthsOf(st, now);
    return m >= 12 ? (Math.round((m / 12) * 10) / 10).toLocaleString(locale) : m;
  };

  const yearsSince = (a) => Math.floor(nowYear(now) - tOf(a, now));
  const st = STAGES.find((x) => x.id === cur);
  const idx = STAGES.indexOf(st) + 1;
  const parallel = STAGES.filter((o) => o !== st && overlap(st, o, now));
  const axisYears = [];
  for (let y = Y0; y < Y1; y += 2) axisYears.push(y);
  const leadL = pct(tOf(LEAD_START, now));
  const leadW = pct(nowYear(now)) - leadL;
  const chips = t(`career.stages.${st.id}.chips`, { returnObjects: true });

  return (
    <div className="cr" onPointerLeave={() => setPaused(false)}>
      <p className="cr__sub scroll-reveal" style={{ '--reveal-delay': '120ms' }}>{t('career.subtitle')}</p>

      <div className="cr__kpis">
        <div className="cr__kpi"><b>{yearsSince(FIRST)}</b><span>{t('career.kpis.years')}</span></div>
        <div className="cr__kpi"><b>{STAGES.length}</b><span>{t('career.kpis.stages')}</span></div>
        <div className="cr__kpi"><b>{yearsSince(LEAD_START)}+</b><span>{t('career.kpis.lead')}</span></div>
      </div>

      <div className="cr__gantt" role="group" aria-label={t('career.ui.aria')}>
        <div className="cr__grid">
          <div className="cr__axis">
            {axisYears.map((y) => <span key={y} style={{ left: `${pct(y)}%` }}>{y}</span>)}
          </div>

          <div className="cr__lane cr__lane--thread">
            <span className="cr__nm">{t('career.ui.thread')}</span>
            <div className="cr__track">
              <div className="cr__thr" data-c="lead" style={{ left: `${leadL}%`, width: `${leadW}%` }}><i />{t('career.ui.threadText')}</div>
            </div>
          </div>

          {STAGES.map((s) => {
            const l = pct(tOf(s.s, now));
            const w = pct(tOf(s.e, now)) - l;
            const dim = s.id !== cur && !parallel.some((p) => p.id === s.id);
            return (
              <div key={s.id} className={`cr__lane${dim ? ' is-dim' : ''}`}>
                <span className="cr__nm">{t(`career.stages.${s.id}.company`)}</span>
                <div className="cr__track">
                  <button
                    type="button"
                    className={`cr__bar${s.e ? '' : ' is-now'}${s.id === cur ? ' is-on' : ''}`}
                    data-c={s.cat}
                    style={{ left: `${l}%`, width: `${w}%` }}
                    onPointerEnter={() => { setPaused(true); setCur(s.id); }}
                    onFocus={() => { setPaused(true); setCur(s.id); }}
                    onClick={() => { setPaused(true); setCur(s.id); }}
                  >
                    <i />{t(`career.stages.${s.id}.role`)}
                  </button>
                </div>
              </div>
            );
          })}

          <div className="cr__hoywrap" aria-hidden="true"><i className="cr__hoy" style={{ left: `${pct(nowYear(now))}%` }}>{t('career.ui.today')}</i></div>
        </div>
      </div>

      <div className="cr__detail" key={cur} aria-live="polite">
        <div className="cr__card" data-c={st.cat}>
          <span className="cr__tag">{t('career.ui.stage', { n: String(idx).padStart(2, '0'), total: String(STAGES.length).padStart(2, '0') })} · {t(`career.cats.${st.cat}`)} · {period(st)}</span>
          <h3>{t(`career.stages.${st.id}.company`)}</h3>
          <span className="cr__role">{t(`career.stages.${st.id}.role`)}</span>
          <p>{t(`career.stages.${st.id}.desc`)}</p>
          {Array.isArray(chips) && <div className="cr__chips">{chips.map((c) => <span key={c}>{c}</span>)}</div>}
        </div>
        <div className="cr__card" data-c={st.cat}>
          <div className="cr__dur">
            <b>{durBig(st)}</b>
            <span>{t(monthsOf(st, now) >= 12 ? 'career.ui.durYears' : 'career.ui.durMonths')}<br />({durText(st)})</span>
          </div>
          <div>
            <h4>{t('career.ui.parallel')}</h4>
            {parallel.length
              ? <div className="cr__chips">{parallel.map((p) => <span key={p.id}>{t(`career.stages.${p.id}.company`)}</span>)}</div>
              : <p>{t('career.ui.exclusive')}</p>}
          </div>
        </div>
      </div>

      <div className="cr__story">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={i}>
            <b>{t(`career.story.${i}`)}</b>
            {i < 5 && <i>{t(`career.story.sep${i}`)}</i>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
