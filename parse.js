import fs from 'fs';
const html = fs.readFileSync('privacy.html', 'utf-8');
const textMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/g);
if (textMatches) {
  const text = textMatches.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(t => t.length > 0).join('\n\n');
  fs.writeFileSync('privacy.txt', text);
}
