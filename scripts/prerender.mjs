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

async function prerender() {
  // Import the SSR bundle built by vite build --ssr
  const { render } = await import('../dist/entry-server.js');

  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

  for (const route of routes) {
    try {
      const html = render(route);
      const finalHtml = template.replace(
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
