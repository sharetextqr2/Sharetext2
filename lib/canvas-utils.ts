import { calculateGrid, renderA4Canvas as originalRenderA4, layoutPhotosOnA4 } from './passport-print';

export function cropToPassport(
  sourceImage: HTMLImageElement,
  cropPixels: { x: number; y: number; width: number; height: number },
  targetWidth: number,
  targetHeight: number,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    sourceImage,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    targetWidth,
    targetHeight,
  );
  return canvas;
}

export function renderA4Sheet(
  passportCanvas: HTMLCanvasElement,
  photoCount: number,
  showCutGuides: boolean,
): HTMLCanvasElement {
  const sizeMm = {
    widthMm: passportCanvas.width / (300 / 25.4),
    heightMm: passportCanvas.height / (300 / 25.4),
  };
  const grid = calculateGrid({ label: '', ...sizeMm }, photoCount);
  return originalRenderA4(passportCanvas, grid, showCutGuides, photoCount);
}
