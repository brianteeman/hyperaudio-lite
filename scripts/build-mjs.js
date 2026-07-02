// Generates js/hyperaudio-lite.mjs from js/hyperaudio-lite.js so the two
// distributions can never drift (#256). The ESM build is the CJS source plus
// an export statement — the CJS export block at the end of the source is
// guarded by `typeof module`, so it is inert under ESM.
//
// Usage: npm run build

'use strict';

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'js', 'hyperaudio-lite.js');
const out = path.join(__dirname, '..', 'js', 'hyperaudio-lite.mjs');

let code = fs.readFileSync(src, 'utf8');
if (!code.endsWith('\n')) {
  code += '\n';
}

// Keep this list in step with the module.exports block in the source.
code += '\n// ESM export (this file is generated from hyperaudio-lite.js — edit that file, then `npm run build`)\n';
code += 'export { HyperaudioLite, hyperaudioPlayerOptions, BasePlayer };\n';

fs.writeFileSync(out, code);
console.log('generated js/hyperaudio-lite.mjs from js/hyperaudio-lite.js');
