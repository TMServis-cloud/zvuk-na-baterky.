import fs from 'fs';
fetch('https://www.trialshow.cz/zasady-ochrany-osobnich-udaju')
  .then(r => r.text())
  .then(t => fs.writeFileSync('privacy.html', t));
