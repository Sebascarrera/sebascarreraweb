import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ContactBuilder.css';

const NEEDS = [
  ['web', '0, 212, 200'], ['demo', '94, 234, 160'], ['ux', '167, 139, 250'],
  ['video', '255, 180, 84'], ['lead', '244, 114, 182'], ['ai', '94, 234, 160'],
];
const WHEN = ['asap', 'weeks', 'explore'];
const STEPS = [['one', '0, 212, 200'], ['two', '167, 139, 250'], ['three', '94, 234, 160']];

export default function ContactBuilder({ email, whatsapp, whatsappDisplay }) {
  const { t } = useTranslation();
  const [needs, setNeeds] = useState([]);
  const [when, setWhen] = useState(null);

  const toggle = (k) => setNeeds((n) => (n.includes(k) ? n.filter((x) => x !== k) : [...n, k]));

  const message = useMemo(() => {
    const list = needs.map((k) => t(`contact.builder.needs.${k}.phrase`));
    const joined = list.length > 1 ? `${list.slice(0, -1).join(', ')} ${t('contact.builder.and')} ${list[list.length - 1]}` : list[0];
    const need = joined || t('contact.builder.generic');
    const w = when ? `, ${t(`contact.builder.when.${when}.phrase`)}` : '';
    return `${t('contact.builder.hello')} ${need}${w}.\n\n${t('contact.builder.more')} `;
  }, [needs, when, t]);

  const waHref = `${whatsapp}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(t('contact.builder.subject'))}&body=${encodeURIComponent(message)}`;

  return (
    <div className="cb">
      <div className="cb__grid">
        <div className="cb__card" style={{ '--c': '0, 212, 200' }}>
          <span className="cb__tag">{t('contact.builder.q1')}</span>
          <div className="cb__chips">
            {NEEDS.map(([k, c]) => (
              <button key={k} type="button" className="cb__chip" style={{ '--c': c }} aria-pressed={needs.includes(k)} onClick={() => toggle(k)}>
                <i />{t(`contact.builder.needs.${k}.label`)}
              </button>
            ))}
          </div>
          <span className="cb__tag">{t('contact.builder.q2')}</span>
          <div className="cb__chips">
            {WHEN.map((k) => (
              <button key={k} type="button" className="cb__chip" style={{ '--c': '233, 240, 243' }} aria-pressed={when === k} onClick={() => setWhen(when === k ? null : k)}>
                <i />{t(`contact.builder.when.${k}.label`)}
              </button>
            ))}
          </div>
        </div>

        <div className="cb__card" style={{ '--c': '94, 234, 160' }}>
          <span className="cb__tag">{t('contact.builder.ready')}</span>
          <div className="cb__msg" aria-live="polite">{message}</div>
          <div className="cb__btns">
            <a className="cb__btn cb__btn--wa" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="cb__btn cb__btn--em" href={mailHref}>{t('contact.builder.emailBtn')}</a>
          </div>
          <p className="cb__direct">{whatsappDisplay} · {email}</p>
        </div>
      </div>

      <div className="cb__steps">
        {STEPS.map(([k, c], i) => (
          <div key={k} className="cb__step" style={{ '--c': c }}>
            <span className="cb__tag">{String(i + 1).padStart(2, '0')}</span>
            <b>{t(`contact.builder.steps.${k}.title`)}</b>
            <span>{t(`contact.builder.steps.${k}.text`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
