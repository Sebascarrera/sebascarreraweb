import React, { useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../i18n.js';
import markup from './cineMarkup.js';
import { initCine } from './initCine.js';
import { WORK } from './work.js';
import './Cine.css';
import './juega.css';

const HTML = { __html: markup };

function Cine() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const goRef = useRef(navigate);
  goRef.current = navigate;
  useEffect(() => {
    const prev = document.title;
    document.title = 'Sebastián Carrera Moya — Diseño y desarrollo de experiencias digitales';
    document.documentElement.classList.add('cine-on');
    const dispose = initCine(ref.current, { i18n, work: WORK, go: (p) => goRef.current(p) });
    return () => { dispose(); document.title = prev; document.documentElement.classList.remove('cine-on'); };
  }, []);
  return <div className="cine" ref={ref} dangerouslySetInnerHTML={HTML} />;
}

export default memo(Cine);
