'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { RefreshCw, Pipette } from 'lucide-react';
import { toast } from 'sonner';

export default function RemoveBackground() {
  const [file, setFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);

  const process = useCallback((f: File) => {
    setFile(f);
    setProcessing(true);
    setResultUrl(null);
    setDownloadBlob(null);

    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Canvas not supported.');
        setProcessing(false);
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const sampleR = data[0];
      const sampleG = data[1];
      const sampleB = data[2];

      const threshold = 80;
      for (let i = 0; i < data.length; i += 4) {
        const dr = Math.abs(data[i] - sampleR);
        const dg = Math.abs(data[i + 1] - sampleG);
        const db = Math.abs(data[i + 2] - sampleB);
        if (dr < threshold && dg < threshold && db < threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      canvas.toBlob((b) => {
        if (!b) {
          toast.error('Failed to process image.');
          setProcessing(false);
          return;
        }
        setResultUrl(URL.createObjectURL(b));
        setDownloadBlob(b);
        toast.success('Background removed!');
        setProcessing(false);
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error('Failed to load image.');
      setProcessing(false);
    };
    img.src = url;
  }, []);

  const reset = () => {
    setFile(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setDownloadBlob(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Remove Background</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={process}
          validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', 'image/'] }}
          label="Drop an image here or click to browse"
        />

        {processing && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-3 text-sm text-gray-600">Removing background...</span>
          </div>
        )}

        {resultUrl && !processing && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Result (transparent background)</h3>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center min-h-[200px]" style={{ backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }}>
              <img src={resultUrl} alt="Result" loading="lazy" className="max-w-full max-h-64 object-contain" />
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

        {!file && !processing && !resultUrl && (
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


