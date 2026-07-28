import { jsPDF } from 'jspdf';
import type { PassportSize, CountryConfig, GridLayout, PhotoPosition } from '@/types/passport-print';

const DPI = 300;
const MM_PER_INCH = 25.4;
const A4_MM_W = 210;
const A4_MM_H = 297;
const MARGIN_MM = 10;
const SPACING_MM = 3;

function mmToPx(mm: number): number {
  return Math.round((mm / MM_PER_INCH) * DPI);
}

export const COUNTRY_CONFIGS: CountryConfig[] = [
  { country: 'India', sizes: [{ label: 'India (35 × 45 mm)', widthMm: 35, heightMm: 45 }] },
  { country: 'USA', sizes: [{ label: 'USA (2 × 2 in)', widthMm: 50.8, heightMm: 50.8 }] },
  { country: 'UK', sizes: [{ label: 'UK (35 × 45 mm)', widthMm: 35, heightMm: 45 }] },
  { country: 'Canada', sizes: [{ label: 'Canada (50 × 70 mm)', widthMm: 50, heightMm: 70 }] },
  { country: 'Australia', sizes: [{ label: 'Australia (35 × 45 mm)', widthMm: 35, heightMm: 45 }] },
  { country: 'Japan', sizes: [{ label: 'Japan (45 × 35 mm)', widthMm: 45, heightMm: 35 }] },
  { country: 'China', sizes: [{ label: 'China (33 × 48 mm)', widthMm: 33, heightMm: 48 }] },
  { country: 'EU', sizes: [{ label: 'EU (35 × 45 mm)', widthMm: 35, heightMm: 45 }] },
];

export function layoutPhotosOnA4(
  photoWidthMm: number,
  photoHeightMm: number,
  count: number,
): { positions: PhotoPosition[]; pageWidthPx: number; pageHeightPx: number; cols: number; rows: number } {
  const pageWpx = mmToPx(A4_MM_W);
  const pageHpx = mmToPx(A4_MM_H);
  const marginPx = mmToPx(MARGIN_MM);
  const spacingPx = mmToPx(SPACING_MM);
  const photoWpx = mmToPx(photoWidthMm);
  const photoHpx = mmToPx(photoHeightMm);

  const availableW = pageWpx - 2 * marginPx;
  const cols = Math.max(1, Math.floor((availableW + spacingPx) / (photoWpx + spacingPx)));
  const rows = Math.max(1, Math.ceil(count / cols));

  const positions: PhotoPosition[] = [];
  let drawn = 0;
  for (let row = 0; row < rows && drawn < count; row++) {
    for (let col = 0; col < cols && drawn < count; col++) {
      const x = marginPx + col * (photoWpx + spacingPx);
      const y = marginPx + row * (photoHpx + spacingPx);
      positions.push({ x, y, width: photoWpx, height: photoHpx });
      drawn++;
    }
  }

  return { positions, pageWidthPx: pageWpx, pageHeightPx: pageHpx, cols, rows };
}

export function calculateGrid(size: PassportSize, count: number): GridLayout {
  const { positions, pageWidthPx, pageHeightPx, cols, rows } = layoutPhotosOnA4(size.widthMm, size.heightMm, count);
  const marginPx = mmToPx(MARGIN_MM);
  const spacingPx = mmToPx(SPACING_MM);
  const photoWpx = mmToPx(size.widthMm);
  const photoHpx = mmToPx(size.heightMm);

  return {
    cols,
    rows,
    total: positions.length,
    photoWpx,
    photoHpx,
    marginPx,
    spacingPx,
    startX: marginPx,
    startY: marginPx,
    pageWpx: pageWidthPx,
    pageHpx: pageHeightPx,
  };
}

export function renderA4Canvas(
  sourceCanvas: HTMLCanvasElement,
  grid: GridLayout,
  showCutGuides: boolean,
  count: number,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = grid.pageWpx;
  canvas.height = grid.pageHpx;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const positions = Array.from({ length: count }, (_, i) => {
    const col = i % grid.cols;
    const row = Math.floor(i / grid.cols);
    return {
      x: grid.startX + col * (grid.photoWpx + grid.spacingPx),
      y: grid.startY + row * (grid.photoHpx + grid.spacingPx),
      width: grid.photoWpx,
      height: grid.photoHpx,
    };
  });

  for (const pos of positions) {
    ctx.drawImage(sourceCanvas, pos.x, pos.y, pos.width, pos.height);
  }

  if (showCutGuides) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (const pos of positions) {
      ctx.strokeRect(pos.x, pos.y, pos.width, pos.height);
    }
    ctx.restore();
  }

  return canvas;
}

export function downloadPng(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((b) => {
    if (!b) return;
    const url = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

export function downloadPdf(canvas: HTMLCanvasElement, filename: string): void {
  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  doc.save(filename + '.pdf');
}

export function printA4(canvas: HTMLCanvasElement): void {
  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Passport Photos</title>
      <style>
        @page { margin: 0; size: A4 portrait; }
        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        img { width: 100%; height: auto; }
        @media print { body { margin: 0; } img { width: 100%; height: 100%; } }
      </style>
    </head>
    <body>
      <img src="${dataUrl}" onload="setTimeout(function(){window.print();window.close()},200)">
    </body>
    </html>
  `);
  win.document.close();
}
