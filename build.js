import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy public logo
const logoSrc = path.join(__dirname, 'images', 'vega-logo.svg');
const logoDest = path.join(distDir, 'vega-logo.svg');
if (fs.existsSync(logoSrc)) {
  fs.copyFileSync(logoSrc, logoDest);
}

// Copy index.html to dist/index.html
const indexSrc = path.join(__dirname, 'index.html');
const indexDest = path.join(distDir, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, indexDest);
}

console.log('✅ VegaDocs landing distribution successfully built into dist/index.html');
