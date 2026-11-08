/* Medidas disuasivas contra la copia de medios. No sustituyen la protección legal (ver /aviso-legal).
   © Juan Sebastián Carrera Moya · JSCM-2026. Todos los derechos reservados. */
let installed = false;

export function installProtection() {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  const isField = (el) => !!(el && el.closest && el.closest('input,textarea,select,[contenteditable="true"]'));
  const isMedia = (el) => !!(el && el.closest && el.closest('img,video,canvas,picture,svg,audio'));

  // Menú contextual (clic derecho / pulsación larga) fuera de campos de texto
  document.addEventListener('contextmenu', (e) => { if (!isField(e.target)) e.preventDefault(); }, true);
  // Arrastrar medios a otra pestaña o al escritorio
  document.addEventListener('dragstart', (e) => { if (isMedia(e.target)) e.preventDefault(); }, true);
  document.addEventListener('selectstart', (e) => { if (isMedia(e.target)) e.preventDefault(); }, true);
  // Guardar página (Ctrl/Cmd+S), ver código fuente (Ctrl/Cmd+U) e imprimir (Ctrl/Cmd+P)
  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
    const k = (e.key || '').toLowerCase();
    if (k === 's' || k === 'u' || k === 'p') e.preventDefault();
  }, true);

  // Atributos en cada imagen o video, incluidos los que se agreguen después
  const harden = (root) => {
    if (!root || root.nodeType !== 1) return;
    const list = root.matches && root.matches('img,video') ? [root] : [];
    root.querySelectorAll && root.querySelectorAll('img,video').forEach((n) => list.push(n));
    list.forEach((n) => {
      if (n.tagName === 'IMG') { n.setAttribute('draggable', 'false'); }
      else {
        n.setAttribute('controlsList', 'nodownload noremoteplayback noplaybackrate');
        n.setAttribute('disablePictureInPicture', '');
        n.setAttribute('disableRemotePlayback', '');
        n.disablePictureInPicture = true; n.disableRemotePlayback = true;
      }
    });
  };
  harden(document.body);
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(harden)))
    .observe(document.documentElement, { childList: true, subtree: true });

  try {
    console.log('%c© Sebastián Carrera Moya', 'font:700 16px sans-serif;color:#00D4C8');
    console.log('Este sitio, sus diseños, animaciones, videos y código están protegidos por derechos de autor. ' +
      'La copia o reutilización sin autorización escrita está prohibida. Licencias: sebascarreramoya@gmail.com · /aviso-legal');
  } catch (_e) { /* sin consola */ }
}
