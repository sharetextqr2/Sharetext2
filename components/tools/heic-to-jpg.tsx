'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function HeicToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (f: File) => {
    setFile(f);
    setProcessing(true);
    setResultUrl(null);
    setDownloadBlob(null);
    setError(null);

    try {
      const heic2any = (await import('heic2any')).default;
      const blob = await heic2any({ blob: f, toType: 'image/jpeg', quality: 0.9 });
      const resultBlob = Array.isArray(blob) ? blob[0] : blob;
      setResultUrl(URL.createObjectURL(resultBlob));
      setDownloadBlob(resultBlob);
      toast.success('HEIC converted to JPG!');
    } catch (err: any) {
      const msg = 'Conversion failed. The file may be unsupported in this browser.';
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  }, []);

  const reset = () => {
    setFile(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setDownloadBlob(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">HEIC to JPG Converter</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={convert}
          validation={{ maxSizeMB: 50, acceptedTypes: ['.heic', '.heif', 'image/heic', 'image/heif'] }}
          label="Drop a HEIC/HEIF file here or click to browse"
        />

        {processing && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-3 text-sm text-gray-600">Converting to JPG...</span>
          </div>
        )}

        {error && !processing && !resultUrl && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Conversion failed</p>
              <p className="text-xs text-amber-700 mt-1">
                HEIC conversion may not be supported in all browsers. Try using Chrome or Edge.
              </p>
            </div>
          </div>
        )}

        {resultUrl && !processing && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">JPG Preview</h3>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center min-h-[200px]">
              <img src={resultUrl} alt="JPG preview" loading="lazy" className="max-w-full max-h-64 object-contain" />
            </div>
            <div className="flex flex-wrap gap-3">
              {downloadBlob && (
                <DownloadSection
                  data={downloadBlob}
                  filename={file?.name?.replace(/\.(heic|heif)$/i, '') || 'converted'}
                  mimeType="image/jpeg"
                  label="Download JPG"
                />
              )}
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Convert Another
              </Button>
            </div>
          </div>
        )}

        {!file && !processing && !resultUrl && !error && (
          <p className="text-center text-xs text-gray-500">
            Upload a HEIC or HEIF file to convert it to JPG format
          </p>
        )}
      </div>
    </div>
  );
}


