/* Escena "Obra seleccionada": tarjetas con las imágenes y videos reales + visor del proyecto. */
/* eslint-disable */
import { REACH } from './work.js';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function createObra(root, { i18n, work, aw }) {
  const $ = (s) => root.querySelector(s);
  const reduceM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobM = () => innerWidth <= 760;
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const tr = (k, o) => i18n.t(k, { lng: lang(), ...o });
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  const fmt = (n) => n.toLocaleString(lang() === 'en' ? 'en-US' : 'es-CO');
  let focus = -1, lastOpener = null;

  const data = (w) => ({
    tag: tr(`projects.cases.${w.id}.tag`),
    client: tr(`projects.cases.${w.id}.client`, { defaultValue: '' }),
    title: tr(`projects.cases.${w.id}.title`),
    problem: tr(`projects.cases.${w.id}.problem`),
    solution: tr(`projects.cases.${w.id}.solution`),
    stack: tr(`projects.cases.${w.id}.stack`, { returnObjects: true }),
  });

  /* ---- visor (modal) ---- */
  let cm = $('#cm');
  if (!cm) {
    cm = document.createElement('div');
    cm.id = 'cm'; cm.className = 'cm'; cm.hidden = true;
    cm.setAttribute('role', 'dialog'); cm.setAttribute('aria-modal', 'true');
    cm.innerHTML = '<div class="cmb"><button type="button" class="cmx" aria-label="Cerrar">✕</button><div class="cmm"></div><div class="cmt"></div></div>';
    root.appendChild(cm);
  }
  const stop = () => { cm.querySelectorAll('video').forEach((v) => { v.pause(); v.removeAttribute('src'); v.load(); }); };
  function close() {
    if (cm.hidden) return;
    stop(); cm.hidden = true; cm.querySelector('.cmm').innerHTML = '';
    document.documentElement.classList.remove('cm-open');
    if (lastOpener) lastOpener.focus({ preventScroll: true });
  }
  function open(i) {
    const w = work[i], d = data(w);
    const pieces = w.gallery ? w.gallery.flatMap((c) => c.pieces) : null;
    let media;
    if (w.video) media = `<video class="cmv" src="${w.video}" poster="${w.image}" controls autoplay muted loop playsinline></video>`;
    else if (pieces) media = `<img class="cmv" id="cmimg" src="${pieces[0].src}" alt="${esc(tr('projects.designGallery.pieces.' + pieces[0].key))}"><div class="cmth">${pieces.map((p, k) => `<button type="button" class="${k ? '' : 'on'}" data-s="${p.src}" data-k="${p.key}" aria-label="${esc(tr('projects.designGallery.pieces.' + p.key))}"><img src="${p.src}" alt="" loading="lazy"></button>`).join('')}</div><p class="cmcap" id="cmcap">${esc(tr('projects.designGallery.pieces.' + pieces[0].key))}</p>`;
    else media = `<img class="cmv" src="${w.full || w.image}" alt="${esc(d.title)}">`;
    const stack = Array.isArray(d.stack) ? d.stack : [];
    const reach = REACH[w.id];
    cm.querySelector('.cmm').innerHTML = media;
    cm.querySelector('.cmt').innerHTML = `<span class="lab"><b>${esc(d.tag)}</b>${d.client ? ' · ' + esc(d.client) : ''}</span><h2 class="disp">${esc(d.title)}</h2>`
      + `<h4>${esc(tr('projects.cases.ui.challenge'))}</h4><p>${esc(d.problem)}</p><h4>${esc(tr('projects.cases.ui.solution'))}</h4><p>${esc(d.solution)}</p>`
      + (reach ? `<div class="cmr"><b>+${fmt(reach)}</b><span>${esc(tr('projects.cases.ui.reached'))}</span></div>` : '')
      + (stack.length ? `<div class="cms">${stack.map((s) => `<span>${esc(s)}</span>`).join('')}</div>` : '')
      + (w.live ? `<a class="cmgo" href="${w.live}" target="_blank" rel="noopener noreferrer">${esc(tr('projects.cases.ui.ctaLive'))} →</a>` : '');
    cm.querySelector('.cmx').setAttribute('aria-label', lang() === 'en' ? 'Close' : 'Cerrar');
    cm.hidden = false; document.documentElement.classList.add('cm-open');
    cm.querySelector('.cmb').scrollTop = 0; cm.querySelector('.cmx').focus({ preventScroll: true });
  }
  cm.addEventListener('click', (e) => {
    if (e.target === cm || e.target.closest('.cmx')) return close();
    const th = e.target.closest('.cmth button');
    if (th) {
      cm.querySelectorAll('.cmth button').forEach((b) => b.classList.toggle('on', b === th));
      const im = cm.querySelector('#cmimg'); im.src = th.dataset.s;
      const cap = tr('projects.designGallery.pieces.' + th.dataset.k); im.alt = cap; cm.querySelector('#cmcap').textContent = cap;
    }
  });
  aw(document, 'keydown', (e) => { if (e.key === 'Escape') close(); });

  /* ---- tarjetas ---- */
  function render() {
    const trk = $('#trk'); if (!trk) return;
    const hint = lang() === 'en' ? 'View project' : 'Ver proyecto';
    trk.innerHTML = work.map((w, i) => {
      const d = data(w), reach = REACH[w.id];
      return `<article class="cd" data-i="${i}" tabindex="0" role="button" aria-label="${esc(d.title)}"><div class="art"><img src="${w.image}" alt="" loading="lazy" decoding="async">${reach ? `<span class="rc">+${fmt(reach)}</span>` : ''}${w.video ? '<span class="pl" aria-hidden="true">▶</span>' : ''}</div><div class="tg"><span>${esc(d.tag)}</span>${d.client ? `<span>${esc(d.client)}</span>` : ''}</div><h3 class="disp">${esc(d.title)}</h3><p>${esc(d.solution)}</p><span class="go">${hint} →</span></article>`;
    }).join('');
    focus = -1; sizeSection(); cm.hidden || close();
  }
  trk_events();
  function trk_events() {
    const trk = $('#trk'); if (!trk) return;
    trk.addEventListener('click', (e) => { const c = e.target.closest('.cd'); if (c) { lastOpener = c; open(+c.dataset.i); } });
    trk.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('cd')) { e.preventDefault(); lastOpener = e.target; open(+e.target.dataset.i); } });
    trk.addEventListener('pointerover', (e) => { const c = e.target.closest('.cd'); if (c && !mobM()) setFocus(+c.dataset.i); });
  }
  function sizeSection() {
    const s = $('#s2'), trk = $('#trk'); if (!s || !trk) return;
    if (mobM() || reduceM) { s.style.height = ''; return; }
    const D = Math.max(0, trk.scrollWidth - innerWidth);
    s.style.height = Math.round(innerHeight + D * 1.2) + 'px';
  }
  aw(window, 'resize', () => { sizeSection(); });
  function setFocus(i) {
    if (i === focus) return; focus = i;
    root.querySelectorAll('#trk .cd').forEach((c, k) => {
      const art = c.querySelector('.art'), w = work[k], on = k === i;
      c.classList.toggle('is-f', on);
      let v = art.querySelector('video');
      if (on && w.video && !mobM() && !reduceM) {
        if (!v) { v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none'; v.src = w.video; art.insertBefore(v, art.querySelector('.rc,.pl')); }
        v.play().catch(() => {});
      } else if (v) { v.pause(); }
    });
  }
  function update(p) {
    if (reduceM || mobM()) return;
    const trk = $('#trk'), vw = innerWidth, max = Math.max(0, trk.scrollWidth - vw);
    trk.style.transform = `translate3d(${-ease(clamp(p * 1.04)) * max}px,0,0)`;
    $('#bar').style.transform = `scaleX(${p})`;
    const n = work.length;
    $('#c2').textContent = String(Math.min(n, 1 + Math.floor(p * n))).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    /* tarjeta más cercana al centro = enfocada (reproduce su video) */
    const cards = trk.children; let best = 0, bd = 1e9;
    for (let k = 0; k < cards.length; k++) { const r = cards[k].getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - vw * 0.5); if (d < bd) { bd = d; best = k; } }
    setFocus(best);
  }
  return { render, update, close };
}
