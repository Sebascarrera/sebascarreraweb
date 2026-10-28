import React, { useLayoutEffect, useRef } from 'react';
import './DecodeText.css';

const GLYPHS = '01<>/{}[]#$%&*+=';

/**
 * Texto que se "decodifica": cada letra aparece como un glifo de código
 * y se resuelve en la letra real, de izquierda a derecha.
 *  - start:    segundos antes de que empiece
 *  - per:      segundos de diferencia entre una letra y la siguiente
 *  - scramble: segundos que cada letra pasa "codificada"
 *  - lines:    si se pasa un arreglo, cada elemento es una línea (sin cortes dentro de la línea)
 * El texto completo queda en un span solo-lectura para lectores de pantalla.
 */
function DecodeText({ text, lines, start = 0, per = 0.03, scramble = 0.6, className = '' }) {
  const rootRef = useRef(null);
  const rows = lines || [text];
  const full = rows.join(' ');

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const chars = Array.from(root.querySelectorAll('.dt__ch'));
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    chars.forEach((c) => { c.textContent = c.dataset.f; });
    if (reduce) return undefined;

    // 1) medir con el texto final, 2) fijar ancho para que el layout no salte, 3) ocultar
    const widths = chars.map((c) => c.getBoundingClientRect().width);
    chars.forEach((c, i) => { c.style.width = `${widths[i]}px`; c.classList.add('dt__hide'); });

    let raf = 0;
    const t0 = performance.now();
    const frame = (now) => {
      const t = (now - t0) / 1000;
      let pending = 0;
      chars.forEach((c, i) => {
        const f = c.dataset.f;
        const s = start + i * per;
        if (f === ' ') { c.classList.remove('dt__hide'); return; }
        if (t < s) { pending += 1; return; }
        if (t < s + scramble) {
          pending += 1;
          c.classList.remove('dt__hide');
          c.classList.add('dt__scr');
          if (!c.dataset.g || Math.floor(now / 55 + i) % 2 === 0) {
            c.dataset.g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          c.textContent = c.dataset.g;
        } else if (c.classList.contains('dt__scr') || c.classList.contains('dt__hide')) {
          c.classList.remove('dt__scr', 'dt__hide');
          c.textContent = f;
        }
      });
      if (pending) raf = requestAnimationFrame(frame);
      else chars.forEach((c) => { c.style.width = ''; });   // layout natural otra vez
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [full, start, per, scramble]);

  return (
    <span className={`dt ${className}`} ref={rootRef}>
      <span className="dt__sr">{full}</span>
      <span aria-hidden="true" className="dt__rows">
        {rows.map((line, li) => (
          <span className="dt__row" key={li}>
            {line.split(' ').map((word, wi, arr) => (
              <React.Fragment key={wi}>
                <span className="dt__w">
                  {word.split('').map((ch, ci) => (
                    <span className="dt__ch" data-f={ch} key={ci}>{ch}</span>
                  ))}
                </span>
                {wi < arr.length - 1 && <span className="dt__ch dt__sp" data-f=" ">{' '}</span>}
              </React.Fragment>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

export default DecodeText;
