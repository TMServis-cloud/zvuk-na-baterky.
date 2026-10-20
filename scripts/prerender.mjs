import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../dist');

// Routes to prerender
const routes = [
  '/',
  '/kontakt',
  '/ochrana-osobnich-udaju',
  '/obchodni-podminky',
];

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Nahradí content="" u <meta name|property="key">; když tag chybí, skončí chybou (build nesmí tiše projít).
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`V index.html chybí <meta ${attr}="${key}">`);
  return html.replace(re, `$1${escAttr(value)}$2`);
}

function applyHead(template, meta, url) {
  let html = template;
  if (!/<title>[^<]*<\/title>/.test(html)) throw new Error('V index.html chybí <title>');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escText(meta.title)}</title>`);
  const canonRe = /(<link\s+rel="canonical"\s+href=")[^"]*(")/;
  if (!canonRe.test(html)) throw new Error('V index.html chybí <link rel="canonical">');
  html = html.replace(canonRe, `$1${escAttr(url)}$2`);
  const ogTitle = meta.ogTitle || meta.title;
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:title', ogTitle);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'name', 'twitter:title', ogTitle);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  return html;
}

async function prerender() {
  // Import the SSR bundle built by vite build --ssr
  const { render, getRouteMeta, canonicalUrl } = await import('../dist/entry-server.js');

  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

  for (const route of routes) {
    try {
      const html = render(route);
      const withHead = route === '/'
        ? template // úvodní stránka má hlavičku přímo v index.html
        : applyHead(template, getRouteMeta(route), canonicalUrl(route));
      const finalHtml = withHead.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      const outDir = route === '/' ? distPath : path.join(distPath, route);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml);
      console.log(`✓ Prerendered: ${route}`);
    } catch (err) {
      console.error(`✗ Failed to prerender ${route}:`, err.message);
      process.exit(1);
    }
  }

  console.log('\nPrerendering complete.');
}

prerender();
