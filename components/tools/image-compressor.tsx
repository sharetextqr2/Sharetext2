'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);
  const [resultSize, setResultSize] = useState(0);

  const compress = useCallback((f: File, q: number) => {
    setProcessing(true);
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

      canvas.toBlob((b) => {
        if (!b) {
          toast.error('Compression failed.');
          setProcessing(false);
          return;
        }
        setDownloadBlob((prev) => { if (prev) URL.revokeObjectURL(prev as unknown as string); return b; });
        setResultUrl(URL.createObjectURL(b));
        setResultSize(b.size);
        toast.success('Image compressed!');
        setProcessing(false);
      }, 'image/jpeg', q / 100);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error('Failed to load image.');
      setProcessing(false);
    };
    img.src = url;
  }, []);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResultUrl(null);
    setDownloadBlob(null);
    setOriginalUrl(URL.createObjectURL(f));
    compress(f, quality);
  }, [quality, compress]);

  const handleQualityChange = (value: number[]) => {
    const q = value[0];
    setQuality(q);
    if (file) compress(file, q);
  };

  const saveRatio = file && resultSize ? ((1 - resultSize / file.size) * 100).toFixed(1) : '0';

  const reset = () => {
    setFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setDownloadBlob(null);
    setQuality(80);
    setResultSize(0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Image Compressor</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={handleFile}
          validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', 'image/'] }}
          label="Drop an image here or click to browse"
        />

        {originalUrl && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="quality" className="text-sm font-medium text-gray-700">
                  Quality: {quality}%
                </label>
                <span className="text-xs text-gray-500">
                  {file && file.size ? `${(file.size / 1024).toFixed(1)} KB → ${(resultSize / 1024).toFixed(1)} KB (${saveRatio}% saved)` : ''}
                </span>
              </div>
              <Slider
                id="quality"
                min={10}
                max={100}
                step={5}
                value={[quality]}
                onValueChange={handleQualityChange}
              />
            </div>

            {processing && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-3 text-sm text-gray-600">Compressing...</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Original</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[150px]">
                  <img src={originalUrl} alt="Original" loading="lazy" className="max-w-full max-h-40 object-contain" />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {file ? `${(file.size / 1024).toFixed(1)} KB` : ''}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Compressed</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[150px]">
                  {resultUrl && (
                    <img src={resultUrl} alt="Compressed" loading="lazy" className="max-w-full max-h-40 object-contain" />
                  )}
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {resultSize ? `${(resultSize / 1024).toFixed(1)} KB` : ''}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {downloadBlob && (
                <DownloadSection
                  data={downloadBlob}
                  filename={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + '-compressed'}
                  mimeType="image/jpeg"
                  label="Download Compressed"
                />
              )}
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Image
              </Button>
            </div>
          </div>
        )}

        {!file && !processing && !originalUrl && (
          <p className="text-center text-xs text-gray-500">
            Upload an image to compress its file size
          </p>
        )}
      </div>
    </div>
  );
}
