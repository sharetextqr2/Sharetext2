import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

function render(svgPath, outPath, width, height) {
  const svg = fs.readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: '#0f172a',
  });
  const pngData = resvg.render();
  fs.writeFileSync(outPath, pngData.asPng());
  console.log('Wrote', outPath);
}

render('public/og-image.svg', 'public/og-image.png', 1200, 630);
render('public/og-image.svg', 'public/og-image-thumb.png', 600, 315);
