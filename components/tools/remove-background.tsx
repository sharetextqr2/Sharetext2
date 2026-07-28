'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, Pipette } from 'lucide-react';
import { toast } from 'sonner';

export default function RemoveBackground() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);

  const process = useCallback(async (f: File) => {
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setProcessing(true);
    setResultUrl(null);
    setDownloadBlob(null);

    try {
      const body = new FormData();
      body.append('file', f);

      const res = await fetch('/api/remove-background', { method: 'POST', body });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Server error' }));
        throw new Error(err.error || `Request failed (${res.status})`);
      }

      const blob = await res.blob();

      if (!blob.type.startsWith('image/')) {
        throw new Error('Unexpected response from server');
      }

      setDownloadBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
      toast.success('Background removed!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  }, []);

  const reset = () => {
    setFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setDownloadBlob(null);
  };

  const showUpload = !file && !processing;
  const showProcessing = processing;
  const showResult = resultUrl && !processing;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Remove Background</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {showUpload && (
          <>
            <ImageUpload
              onFile={process}
              validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', 'image/'] }}
              label="Drop an image here or click to browse"
            />
            <p className="text-center text-xs text-gray-500">
              Uses open-source AI via Hugging Face. Your image is sent securely to the server.
            </p>
          </>
        )}

        {showProcessing && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm text-gray-600">Removing background with AI...</span>
            <div className="w-full max-w-xs bg-gray-100 rounded-full h-1.5 mt-1">
              <div className="bg-primary h-1.5 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {showResult && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Result (transparent background)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Original</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[200px]">
                  <img src={originalUrl!} alt="Original" loading="lazy" className="max-w-full max-h-48 object-contain" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Result</p>
                <div
                  className="rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[200px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, #e5e5e5 25%, transparent 25%), linear-gradient(-45deg, #e5e5e5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e5e5 75%), linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                  }}
                >
                  <img src={resultUrl} alt="Result" loading="lazy" className="max-w-full max-h-48 object-contain" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {downloadBlob && (
                <DownloadSection
                  data={downloadBlob}
                  filename={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-no-bg'}
                  mimeType="image/png"
                  label="Download PNG"
                />
              )}
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Image
              </Button>
            </div>
          </div>
        )}

        {showUpload && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Pipette className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Upload an image to automatically remove its background
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
