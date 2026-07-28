import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const vtracer = require('@visioncortex/vtracer');

    const buffer = Buffer.from(await file.arrayBuffer());
    const svg = vtracer.convertBuffer(buffer, {
      mode: 'spline',
      filterSpeckle: 4,
      colorPrecision: 6,
      layerDifference: 180,
      lengthThreshold: 4.0,
      pathPrecision: 8,
    });

    return new NextResponse(svg, {
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  } catch (err) {
    console.error('VTracer conversion error:', err);
    return NextResponse.json(
      { error: 'Failed to convert image. Please try a different file.' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
