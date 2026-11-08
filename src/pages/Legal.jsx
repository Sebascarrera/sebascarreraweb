import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Legal.css';

const TX = {
  es: {
    back: '← Volver al portafolio',
    title: 'Aviso legal y derechos de autor',
    updated: 'Última actualización: 7 de noviembre de 2026',
    sections: [
      ['1. Titularidad', 'Todo el contenido de este sitio (diseños, interfaces, animaciones, ilustraciones, videos, textos, código fuente y experiencias interactivas) es obra de Juan Sebastián Carrera Moya («el autor»), salvo donde se indique lo contrario. Está protegido por la legislación de derechos de autor aplicable en Colombia (Ley 23 de 1982 y Decisión Andina 351 de 1993) y por tratados internacionales como el Convenio de Berna. © 2010–2026. Todos los derechos reservados.'],
      ['2. Uso permitido', 'Puedes navegar el sitio y ver su contenido para conocer mi trabajo y evaluar una posible contratación. Compartir el enlace del sitio está permitido y es bienvenido.'],
      ['3. Usos prohibidos sin autorización escrita', 'Copiar, descargar, capturar, grabar, reproducir, modificar, distribuir, publicar o extraer (incluido el rastreo automatizado) imágenes, videos, textos, código, animaciones o la estructura del sitio. Replicar sus interacciones, juegos o diseños, o hacer ingeniería inversa para crear obras derivadas o similares. Usar el contenido para entrenar, ajustar o alimentar sistemas de inteligencia artificial.'],
      ['4. Marcas y obras de terceros', 'Los nombres, logotipos, marcas y materiales de clientes o terceros que aparecen en el sitio pertenecen a sus respectivos titulares y se muestran únicamente como referencia del trabajo realizado. Su aparición no implica patrocinio ni cesión de derechos.'],
      ['5. Marcas de autoría', 'Las imágenes y videos incluyen marcas de autoría visibles e invisibles. Eliminarlas, alterarlas u ocultarlas constituye una infracción adicional.'],
      ['6. Acciones ante el uso indebido', 'El autor podrá reclamar la retirada del contenido ante plataformas, buscadores y proveedores de alojamiento, y ejercer las acciones legales que correspondan.'],
      ['7. Licencias y permisos', 'Si deseas usar algún material, escríbeme y acordamos los términos por escrito:'],
    ],
  },
  en: {
    back: '← Back to portfolio',
    title: 'Legal notice and copyright',
    updated: 'Last updated: November 7, 2026',
    sections: [
      ['1. Ownership', 'All content on this site (designs, interfaces, animations, illustrations, videos, text, source code and interactive experiences) is the work of Juan Sebastián Carrera Moya (“the author”), unless stated otherwise. It is protected by the copyright laws applicable in Colombia (Law 23 of 1982 and Andean Decision 351 of 1993) and by international treaties such as the Berne Convention. © 2010–2026. All rights reserved.'],
      ['2. Permitted use', 'You may browse the site and view its content to learn about my work and consider hiring me. Sharing the site link is allowed and welcome.'],
      ['3. Uses prohibited without written permission', 'Copying, downloading, capturing, recording, reproducing, modifying, distributing, publishing or extracting (including automated scraping) images, videos, text, code, animations or the structure of the site. Replicating its interactions, games or designs, or reverse engineering them to create derivative or similar works. Using the content to train, fine-tune or feed artificial intelligence systems.'],
      ['4. Third-party trademarks and works', 'Names, logos, trademarks and materials of clients or third parties shown on this site belong to their respective owners and appear only as a reference to the work performed. Their appearance does not imply endorsement or transfer of rights.'],
      ['5. Authorship marks', 'Images and videos carry visible and invisible authorship marks. Removing, altering or hiding them is an additional infringement.'],
      ['6. Actions against misuse', 'The author may request removal of the content from platforms, search engines and hosting providers, and pursue the legal actions available.'],
      ['7. Licenses and permissions', 'If you would like to use any material, write to me and we will agree on terms in writing:'],
    ],
  },
};

export default function Legal() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('language') === 'en' ? 'en' : 'es'; } catch (_e) { return 'es'; }
  });
  const t = TX[lang];
  useEffect(() => {
    const prev = document.title;
    document.title = (lang === 'en' ? 'Legal notice' : 'Aviso legal') + ' — Sebastián Carrera Moya';
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
    return () => { document.title = prev; };
  }, [lang]);
  const pick = (l) => { setLang(l); try { localStorage.setItem('language', l); } catch (_e) { /* sin almacenamiento */ } };

  return (
    <div className="legal-wrap"><main className="legal">
      <div className="legal__bar">
        <Link to="/" className="legal__back">{t.back}</Link>
        <div className="legal__lang" role="group" aria-label="Idioma">
          <button aria-pressed={lang === 'es'} onClick={() => pick('es')}>ES</button>
          <button aria-pressed={lang === 'en'} onClick={() => pick('en')}>EN</button>
        </div>
      </div>
      <h1>{t.title}</h1>
      <p className="legal__date">{t.updated}</p>
      {t.sections.map(([h, p]) => (
        <section key={h}><h2>{h}</h2><p>{p}</p></section>
      ))}
      <p className="legal__contact">
        <a href="mailto:sebascarreramoya@gmail.com">sebascarreramoya@gmail.com</a> · <a href="https://wa.me/573133510006" target="_blank" rel="noopener noreferrer">WhatsApp +57 313 351 0006</a>
      </p>
      <p className="legal__foot">© 2010–2026 Juan Sebastián Carrera Moya · sebastiancarreramoya.com</p>
    </main></div>
  );
}
