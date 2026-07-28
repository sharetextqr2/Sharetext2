import type { OcrResult, OcrProgress, OcrSpaceResponse } from '@/types/ocr';
import { parseOcrResponse, prepareImageForUpload } from '@/lib/ocr/ocrspace';

type ProgressCallback = (progress: OcrProgress) => void;

export async function performOcr(
  file: File,
  onProgress?: ProgressCallback
): Promise<OcrResult> {
  const emit = (stage: OcrProgress['stage'], message: string) => {
    onProgress?.({ stage, message });
  };

  try {
    emit('preparing', 'Preparing Image...');

    const processedBlob = await prepareImageForUpload(file);

    emit('uploading', 'Uploading...');

    const formData = new FormData();
    formData.append('file', processedBlob, file.name);

    const response = await fetch('/api/ocr', {
      method: 'POST',
      body: formData,
    });

    emit('recognizing', 'Recognizing Text...');

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'OCR request failed' }));
      throw new Error(err.error || `Server error (${response.status})`);
    }

    const json: OcrSpaceResponse = await response.json();

    emit('formatting', 'Formatting Result...');

    const result = parseOcrResponse(json);

    emit('done', 'Completed');
    return result;
  } catch (err) {
    emit('error', err instanceof Error ? err.message : 'OCR failed');
    throw err;
  }
}
