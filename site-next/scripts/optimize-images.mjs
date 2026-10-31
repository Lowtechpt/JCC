// Optimiza as fotos de assets-originais/ para public/img/ (WebP, sem ampliar) e gera favicons/OG.
// Corre com: npm run images
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('..', 'assets-originais');
const OUT = path.resolve('public', 'img');
await mkdir(OUT, { recursive: true });

const photos = {
  interior: 'loja-interior.jpg',
  fachada: 'loja-fachada-2.jpg',
  'fachada-noite': 'loja-fachada-1.jpg',
  balcao: 'loja-balcao.jpg',
  tiago: 'equipa-tiago-correia.jpg',
  nuno: 'equipa-nuno-correia.jpg',
  jose: 'equipa-jose-correia.jpg',
};

const meta = {};
for (const [key, file] of Object.entries(photos)) {
  const img = sharp(path.join(SRC, file));
  const { width, height } = await img.metadata();
  await img.webp({ quality: 82, effort: 6 }).toFile(path.join(OUT, `${key}.webp`));
  meta[key] = { src: `/img/${key}.webp`, width, height };
}
// versao mais pequena do hero para ecras estreitos
await sharp(path.join(SRC, photos.interior)).resize({ width: 640 }).webp({ quality: 80, effort: 6 }).toFile(path.join(OUT, 'interior-640.webp'));
meta['interior-640'] = { src: '/img/interior-640.webp', width: 640, height: 480 };

// Fotos de equipamentos (StockSnap, CC0; ver assets-stock/LICENCAS.md): ate 960px e miniatura 4:3 de 320px para a lista da home
const STOCK = path.resolve('..', 'assets-stock');
const devices = {
  telemovel: 'telemovel.jpg',
  placa: 'placa.jpg',
  'comando-tv': 'comando-tv.jpg',
  'comando-consola': 'comando-consola.jpg',
  disco: 'disco.jpg',
  'ecra-software': 'ecra-software.jpg',
  escritorio: 'escritorio.jpg',
  equipamentos: 'equipamentos.jpg',
};
for (const [name, file] of Object.entries(devices)) {
  const key = `dev-${name}`;
  const full = await sharp(path.join(STOCK, file))
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(OUT, `${key}.webp`));
  meta[key] = { src: `/img/${key}.webp`, width: full.width, height: full.height };
  const thumb = await sharp(path.join(STOCK, file))
    .resize(320, 240, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(OUT, `${key}-320.webp`));
  meta[`${key}-320`] = { src: `/img/${key}-320.webp`, width: thumb.width, height: thumb.height };
}

await writeFile(
  path.resolve('src', 'data', 'images.ts'),
  `// Gerado por scripts/optimize-images.mjs. Nao editar.\nexport const images = ${JSON.stringify(meta, null, 2)} as const;\nexport type ImageKey = keyof typeof images;\n`,
  'utf8',
);

// OG 1200x630 a partir da fachada (a original e pequena: ampliacao inevitavel, recorte centrado)
await sharp(path.join(SRC, photos.fachada)).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 86 }).toFile(path.resolve('public', 'og-image.jpg'));

// logo para JSON-LD
await sharp(path.join(SRC, 'logo.png')).resize(512, 512).png().toFile(path.resolve('public', 'logo-jcc.png'));

// favicons a partir do SVG
const svg = await readFile(path.resolve('public', 'favicon.svg'));
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(path.resolve('public', name));
}
console.log('ok');
