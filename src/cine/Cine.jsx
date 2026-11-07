import React, { useEffect, useRef, memo } from 'react';
import i18n from '../i18n.js';
import markup from './cineMarkup.js';
import { initCine } from './initCine.js';
import { WORK } from './work.js';
import './Cine.css';

const HTML = { __html: markup };

function Cine() {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.title;
    document.title = 'Sebastián Carrera Moya — De la idea a la realidad digital';
    document.documentElement.classList.add('cine-on');
    const dispose = initCine(ref.current, { i18n, work: WORK });
    return () => { dispose(); document.title = prev; document.documentElement.classList.remove('cine-on'); };
  }, []);
  return <div className="cine" ref={ref} dangerouslySetInnerHTML={HTML} />;
}

export default memo(Cine);
