// Genera dist/en/index.html (versión en inglés con su propia URL) a partir de dist/index.html.
import fs from 'node:fs';
const src = fs.readFileSync('dist/index.html', 'utf8');
const TITLE = 'Sebastián Carrera Moya — Web design & interactive digital experiences';
const DESC = 'Web designer and developer building interactive digital experiences with React, UI/UX and AI: landing pages, web games and platforms for brands and companies. Based in Bogotá, Colombia, working worldwide.';
const OGDESC = 'Interactive digital experiences with React, UI/UX and AI for brands and companies.';
const STATIC = `<div id="root"><div id="seo-static">
      <h1>${TITLE}</h1>
      <p>Ideas into digital reality. I design and build interactive digital experiences with React, UI/UX and artificial intelligence: landing pages, web games and platforms for brands and companies. Sixteen years of creative and technical experience. Based in Bogotá, Colombia, working with clients across the Americas, Europe and Australia.</p>
      <h2>Services</h2>
      <ul><li>Websites and landing pages built with React</li><li>Interactive web games and experiences</li><li>UI/UX interface design</li><li>Experiences powered by artificial intelligence</li><li>Graphic pieces, print and trade-show materials</li></ul>
      <h2>Projects</h2>
      <ul><li>Cybersecurity Day 2026</li><li>BOOST™ stand for Mentor Breast Canada</li><li>Print and trade-show materials</li><li>Sprint Falabella</li><li>Money Week Challenge</li><li>Colmena Route Game</li><li>Mundo Colmena</li><li>AI virtual presenter</li><li>GoGo Racing</li><li>Vida Silvestre</li><li>FullStaff app video</li></ul>
      <h2>Experience</h2>
      <p>Moya Producciones (2010), Singularcom (2012), Imperia Software Solutions (2016), Freelance (2022), Mentor Canada (2024).</p>
      <h2>Contact</h2>
      <p>Tell me what you want to achieve and I will reply with a clear proposal. Write to <a href="mailto:sebascarreramoya@gmail.com">sebascarreramoya@gmail.com</a>.</p>
      <p><a href="/aviso-legal">Legal notice</a></p>
    </div></div>`;
let h = src
  .replace('<html lang="es">', '<html lang="en">')
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*"/, `$1${DESC}"`)
  .replace(/<link rel="canonical" href="[^"]*" \/>/, '<link rel="canonical" href="https://sebastiancarreramoya.com/en/" />')
  .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`)
  .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${OGDESC}"`)
  .replace(/(<meta property="og:url" content=")[^"]*"/, '$1https://sebastiancarreramoya.com/en/"')
  .replace('content="es_CO" />', 'content="en_US" />').replace('content="en_US" />\n    <meta property="og:locale:alternate" content="en_US"', 'content="en_US" />\n    <meta property="og:locale:alternate" content="es_CO"')
  .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`)
  .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${OGDESC}"`)
  .replace(/<div id="root">[\s\S]*?<\/div><\/div>/, STATIC);
if (!h.includes('hreflang="en"')) throw new Error('hreflang ausente en index.html');
fs.mkdirSync('dist/en', { recursive: true });
fs.writeFileSync('dist/en/index.html', h);
console.log('✓ dist/en/index.html generado');
