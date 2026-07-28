import type { OcrSpaceResponse, OcrResult, OcrSpaceParsedResult, OcrSpaceLine } from '@/types/ocr';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isListLine(text: string): boolean {
  return /^[\s]*[•\-*\d]+[.)]\s/.test(text.trim());
}

function isHeading(text: string, lineIndex: number, totalLines: number): boolean {
  if (lineIndex === 0 && totalLines > 1) return text.length < 80;
  if (text.length < 40 && /^[A-Z][A-Z\s]+$/.test(text.trim())) return true;
  return false;
}

export function parseOcrResponse(json: OcrSpaceResponse): OcrResult {
  const parsed = json.ParsedResults?.[0];
  if (!parsed) {
    return {
      text: '',
      formattedHtml: '<p>No text could be extracted.</p>',
      rawJson: JSON.stringify(json, null, 2),
      confidence: 0,
      orientation: '',
      processingTime: parseInt(json.ProcessingTimeInMilliseconds || '0', 10),
    };
  }

  const rawText = parsed.ParsedText || '';
  const orientation = parsed.TextOrientation || '';
  const exitCode = parsed.FileParseExitCode;

  const formattedHtml = buildFormattedHtml(parsed, rawText);

  return {
    text: rawText,
    formattedHtml,
    rawJson: JSON.stringify(json, null, 2),
    confidence: exitCode === 1 ? 95 : exitCode === 2 ? 70 : 30,
    orientation,
    processingTime: parseInt(json.ProcessingTimeInMilliseconds || '0', 10),
  };
}

function buildFormattedHtml(parsed: OcrSpaceParsedResult, rawText: string): string {
  const lines = parsed.TextOverlay?.Lines;

  if (lines && lines.length > 0) {
    return buildFromOverlay(lines);
  }

  return buildFromRawText(rawText);
}

function buildFromOverlay(lines: OcrSpaceLine[]): string {
  const groups: OcrSpaceLine[][] = [[]];
  let prevTop = lines[0]?.MinTop ?? 0;

  for (const line of lines) {
    if (line.MinTop - prevTop > line.MaxHeight * 1.5 && groups[groups.length - 1].length > 0) {
      groups.push([]);
    }
    groups[groups.length - 1].push(line);
    prevTop = line.MinTop;
  }

  const lefts = groups
    .flatMap((g) => g.map((l) => l.Words?.[0]?.Left ?? 0))
    .filter((l) => l > 0);

  const pageWidth = lefts.length > 0 ? Math.max(...lefts) * 3 : 800;
  const gap = pageWidth / 3;

  const colGroups: OcrSpaceLine[][][] = [];
  const used = new Set<number>();

  for (let gi = 0; gi < groups.length; gi++) {
    if (used.has(gi)) continue;
    const col: number[] = [gi];
    used.add(gi);
    const gLeft = groups[gi][0]?.Words?.[0]?.Left ?? 0;
    for (let gj = gi + 1; gj < groups.length; gj++) {
      if (used.has(gj)) continue;
      const gjLeft = groups[gj][0]?.Words?.[0]?.Left ?? 0;
      if (Math.abs(gjLeft - gLeft) < gap) {
        col.push(gj);
        used.add(gj);
      }
    }
    colGroups.push(col.map((i) => groups[i]));
  }

  const formatGroup = (g: OcrSpaceLine[]): string => {
    return g
      .map((line, idx) => {
        const text = line.LineText.trim();
        if (!text) return '';
        if (isListLine(text)) {
          const clean = text.replace(/^[\s]*[•\-*\d]+[.)]\s*/, '');
          return `<li>${escapeHtml(clean)}</li>`;
        }
        if (isHeading(text, idx, g.length)) {
          return `<h3 style="font-size:1.1rem;font-weight:600;margin:0.75rem 0 0.25rem">${escapeHtml(text)}</h3>`;
        }
        return `<p style="margin:0.3rem 0;line-height:1.6">${escapeHtml(text)}</p>`;
      })
      .join('\n');
  };

  if (colGroups.length > 1) {
    const colsHtml = colGroups
      .map((g) => {
        const paras = formatGroup(g.flat());
        const hasList = paras.includes('<li>');
        if (hasList) {
          return `<div style="flex:1;min-width:0">${paras.replace(/<li>.*?(?:<\/li>)/gs, (m) => m)}</div>`;
        }
        return `<div style="flex:1;min-width:0">${paras}</div>`;
      })
      .join('');

    const wrapLists = (html: string): string => {
      return html.replace(
        /(<li>[\s\S]*?<\/li>)(\s*<li>[\s\S]*?<\/li>)*/g,
        (match) => `<ul style="list-style:disc;padding-left:1.5rem;margin:0.4rem 0">${match}</ul>`
      );
    };

    return `<div style="display:flex;gap:1.5rem">${wrapLists(colsHtml)}</div>`;
  }

  const flat = groups.flat();
  const output: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      output.push(`<ul style="list-style:disc;padding-left:1.5rem;margin:0.4rem 0">${listBuffer.join('')}</ul>`);
      listBuffer = [];
    }
  };

  for (let i = 0; i < flat.length; i++) {
    const text = flat[i].LineText.trim();
    if (!text) continue;

    if (isListLine(text)) {
      const clean = text.replace(/^[\s]*[•\-*\d]+[.)]\s*/, '');
      listBuffer.push(`<li>${escapeHtml(clean)}</li>`);
    } else {
      flushList();
      if (isHeading(text, i, flat.length)) {
        output.push(`<h3 style="font-size:1.1rem;font-weight:600;margin:0.75rem 0 0.25rem">${escapeHtml(text)}</h3>`);
      } else {
        output.push(`<p style="margin:0.3rem 0;line-height:1.6">${escapeHtml(text)}</p>`);
      }
    }
  }
  flushList();

  return output.join('\n');
}

function buildFromRawText(rawText: string): string {
  const paragraphs = rawText.split(/\n\s*\n/);
  return paragraphs
    .map((para) => {
      const lines = para.split('\n').filter(Boolean);
      if (lines.length === 0) return '';
      const text = lines.join('<br>');
      return `<p style="margin:0.3rem 0;line-height:1.6">${escapeHtml(text)}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}

function preprocessCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imageData.data;

  let min = 255;
  let max = 0;
  for (let i = 0; i < d.length; i += 4) {
    const gray = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
    d[i] = d[i + 1] = d[i + 2] = gray;
    if (gray < min) min = gray;
    if (gray > max) max = gray;
  }

  const range = max - min || 1;
  for (let i = 0; i < d.length; i += 4) {
    const stretched = Math.round(((d[i] - min) / range) * 200 + 28);
    d[i] = d[i + 1] = d[i + 2] = Math.min(255, Math.max(0, stretched));
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export async function prepareImageForUpload(file: File): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error('Failed to load image'));
    i.src = URL.createObjectURL(file);
  });

  const canvas = document.createElement('canvas');
  const maxDim = 2000;
  let w = img.naturalWidth;
  let h = img.naturalHeight;

  if (w > maxDim || h > maxDim) {
    const ratio = Math.min(maxDim / w, maxDim / h);
    w = Math.round(w * ratio);
    h = Math.round(h * ratio);
  }

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, w, h);

  preprocessCanvas(canvas);

  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.92);
  });
}
