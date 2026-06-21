import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';

const svgPath = 'public/favicon.svg';
const pngPath = 'public/favicon.png';
const icoPath = 'public/favicon.ico';

const svg = fs.readFileSync(svgPath);
const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 256 } });
const pngData = resvg.render().asPng();
fs.writeFileSync(pngPath, pngData);
console.log('Wrote', pngPath);
const icoData = await pngToIco(pngPath);
fs.writeFileSync(icoPath, icoData);
console.log('Wrote', icoPath);
