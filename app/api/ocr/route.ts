import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/bmp',
  'image/tiff',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OCRSPACE_API_KEY;
    if (!apiKey) {
      console.error('[OCR API] Missing OCRSPACE_API_KEY environment variable');
      return NextResponse.json(
        { error: 'OCR service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please upload an image.' },
        { status: 400 }
      );
    }

    const isAllowed = ALLOWED_TYPES.some((type) => file.type.startsWith(type));
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a PNG, JPG, WEBP, BMP, or TIFF image.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 10 MB.' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const blob = new Blob([fileBuffer], { type: file.type });

    const ocrForm = new FormData();
    ocrForm.append('file', blob, file.name);
    ocrForm.append('apikey', apiKey);
    ocrForm.append('language', 'eng');
    ocrForm.append('isOverlayRequired', 'true');
    ocrForm.append('detectOrientation', 'true');
    ocrForm.append('scale', 'true');
    ocrForm.append('OCREngine', '2');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let ocrResponse: Response;
    try {
      ocrResponse = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: ocrForm as unknown as BodyInit,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!ocrResponse.ok) {
      const errorText = await ocrResponse.text().catch(() => '');
      console.error(`[OCR API] OCR.Space returned ${ocrResponse.status}:`, errorText);

      if (ocrResponse.status === 403) {
        return NextResponse.json(
          { error: 'OCR service authentication failed. Invalid API key.' },
          { status: 502 }
        );
      }
      if (ocrResponse.status === 429) {
        return NextResponse.json(
          { error: 'OCR rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'OCR service returned an error. Please try again.' },
        { status: 502 }
      );
    }

    const result = await ocrResponse.json();

    const exitCode = result?.OCRExitCode;
    if (exitCode === 1 || exitCode === 2) {
      return NextResponse.json(result);
    }

    const errorMsg = result?.ParsedResults?.[0]?.ErrorMessage
      || result?.ErrorMessage
      || 'OCR processing failed. Please try a different image.';

    console.error('[OCR API] OCR.Space processing error:', errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 422 });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return NextResponse.json(
        { error: 'OCR request timed out. Please try a smaller image.' },
        { status: 504 }
      );
    }
    console.error('[OCR API] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
