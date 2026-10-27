import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './DesignGallery.css';

/**
 * Galería de piezas de diseño para el modal de proyectos.
 * props.categories: [{ key, pieces: [{ key, src }] }]
 * Textos: projects.designGallery.cats.<key> y projects.designGallery.pieces.<key>
 */
function DesignGallery({ categories }) {
  const { t } = useTranslation();
  const [catIdx, setCatIdx] = useState(0);
  const [pieceIdx, setPieceIdx] = useState(0);
  const [zoom, setZoom] = useState(false);

  const cat = categories[catIdx];
  const pieces = cat.pieces;
  const piece = pieces[pieceIdx];
  const label = (k) => t(`projects.designGallery.pieces.${k}`);

  const go = useCallback((dir) => {
    setZoom(false);
    setPieceIdx((i) => (i + dir + pieces.length) % pieces.length);
  }, [pieces.length]);

  const pickCat = (i) => { setCatIdx(i); setPieceIdx(0); setZoom(false); };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // Swipe táctil
  const touch = useMemo(() => ({ x: null }), []);
  const onTouchStart = (e) => { touch.x = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.x == null || zoom) return;
    const dx = e.changedTouches[0].clientX - touch.x;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touch.x = null;
  };

  return (
    <div className="dgal">
      <div className="dgal__tabs" role="tablist">
        {categories.map((c, i) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={i === catIdx}
            className={`dgal__tab${i === catIdx ? ' dgal__tab--active' : ''}`}
            onClick={() => pickCat(i)}
          >
            {t(`projects.designGallery.cats.${c.key}`)}
          </button>
        ))}
      </div>

      <div
        className={`dgal__stage${zoom ? ' dgal__stage--zoom' : ''}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={piece.src}
          src={piece.src}
          alt={label(piece.key)}
          className="dgal__img"
          onClick={() => setZoom((z) => !z)}
          draggable={false}
        />
        {pieces.length > 1 && (
          <>
            <button className="dgal__nav dgal__nav--prev" onClick={() => go(-1)} aria-label="Anterior">‹</button>
            <button className="dgal__nav dgal__nav--next" onClick={() => go(1)} aria-label="Siguiente">›</button>
          </>
        )}
      </div>

      <div className="dgal__caption">
        <span>{label(piece.key)}</span>
        <span className="dgal__count">{pieceIdx + 1} / {pieces.length}</span>
      </div>

      <div className="dgal__thumbs">
        {pieces.map((p, i) => (
          <button
            key={p.key}
            className={`dgal__thumb${i === pieceIdx ? ' dgal__thumb--active' : ''}`}
            onClick={() => { setPieceIdx(i); setZoom(false); }}
            aria-label={label(p.key)}
          >
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default DesignGallery;
