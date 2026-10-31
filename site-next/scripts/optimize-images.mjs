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

// Imagem de partilha (WhatsApp, Facebook...), 1200x630 no estilo do site: marca, titulo e linha em Geist (a letra
// do site) a esquerda, foto do interior da loja a direita. Fica bem abaixo dos 300 KB que o WhatsApp aceita.
const FONTS = path.resolve('node_modules', 'geist', 'dist', 'fonts', 'geist-sans');
const ink = '#0A0D14';
const blue = '#1F55F0';
const grey = '#5F6779';
const label = (markup, size, weight, width) =>
  sharp({
    text: {
      text: markup,
      font: `Geist ${weight} ${size}`,
      fontfile: path.join(FONTS, `Geist-${weight}.ttf`),
      width,
      dpi: 72,
      rgba: true,
      spacing: Math.round(size * 0.12),
    },
  })
    .png()
    .toBuffer();
const markSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 10 40 50" width="46" height="58"><g fill="${blue}"><polygon points="40,10 52,22 40,34 28,22"/><polygon points="24,25 36,37 24,49 12,37"/><polygon points="40,36 52,48 40,60 28,48"/></g></svg>`,
);
const [photoW, photoH] = [520, 550];
const ogPhoto = await sharp(path.join(SRC, photos.interior))
  .resize(photoW, photoH, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(`<svg width="${photoW}" height="${photoH}"><rect width="${photoW}" height="${photoH}" rx="28"/></svg>`), blend: 'dest-in' }])
  .png()
  .toBuffer();
// Cada bloco e posto pela altura real do texto de cima, para nada se sobrepor
const heightOf = async (buf) => (await sharp(buf).metadata()).height;
const mark = await sharp(markSvg, { density: 288 }).resize({ height: 52 }).png().toBuffer();
const brand = await label(`<span foreground="${ink}">JCC Computadores</span>`, 30, 'Bold', 420);
const headline = await label(
  `<span foreground="${ink}">Reparar é sempre\na </span><span foreground="${blue}">melhor</span><span foreground="${ink}"> escolha.</span>`,
  56,
  'Bold',
  520,
);
const sub = await label(`<span foreground="${grey}">Computadores, telemóveis,\ntelevisões e consolas.</span>`, 28, 'Regular', 500);
const place = await label(`<span foreground="${ink}">Leça da Palmeira · desde 1994</span>`, 26, 'SemiBold', 500);
const headTop = 196;
const subTop = headTop + (await heightOf(headline)) + 40;
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([
    { input: mark, left: 64, top: 64 },
    { input: brand, left: 124, top: 64 + Math.round((52 - (await heightOf(brand))) / 2) },
    { input: headline, left: 64, top: headTop },
    { input: sub, left: 64, top: subTop },
    { input: place, left: 64, top: 630 - 64 - (await heightOf(place)) },
    { input: ogPhoto, left: 616, top: 40 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.resolve('public', 'og-image.jpg'));

// logo para JSON-LD
await sharp(path.join(SRC, 'logo.png')).resize(512, 512).png().toFile(path.resolve('public', 'logo-jcc.png'));

// favicons a partir do SVG
const svg = await readFile(path.resolve('public', 'favicon.svg'));
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(path.resolve('public', name));
}
console.log('ok');
