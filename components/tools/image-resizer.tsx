'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [processing, setProcessing] = useState(false);

  const doResize = useCallback((f: File, w: number, h: number) => {
    if (!w || !h) return;
    setProcessing(true);
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Canvas not supported.');
        setProcessing(false);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob((b) => {
        if (!b) {
          toast.error('Resize failed.');
          setProcessing(false);
          return;
        }
        setDownloadBlob(b);
        setResultUrl(URL.createObjectURL(b));
        toast.success('Image resized!');
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

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResultUrl(null);
    setDownloadBlob(null);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);
    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = url;
  }, []);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseInt(e.target.value) || 0;
    setWidth(w);
    if (keepAspect && originalWidth) {
      setHeight(Math.round(w * (originalHeight / originalWidth)));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value) || 0;
    setHeight(h);
    if (keepAspect && originalHeight) {
      setWidth(Math.round(h * (originalWidth / originalHeight)));
    }
  };

  useEffect(() => {
    if (file && width && height) {
      const timer = setTimeout(() => doResize(file, width, height), 300);
      return () => clearTimeout(timer);
    }
  }, [file, width, height, doResize]);

  const reset = () => {
    setFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setDownloadBlob(null);
    setWidth(0);
    setHeight(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Image Resizer</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={handleFile}
          validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', 'image/'] }}
          label="Drop an image here or click to browse"
        />

        {originalUrl && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="width" className="text-sm font-medium text-gray-700">Width (px)</label>
                <Input
                  id="width"
                  type="number"
                  min={1}
                  value={width || ''}
                  onChange={handleWidthChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="height" className="text-sm font-medium text-gray-700">Height (px)</label>
                <Input
                  id="height"
                  type="number"
                  min={1}
                  value={height || ''}
                  onChange={handleHeightChange}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="keep-aspect"
                checked={keepAspect}
                onCheckedChange={(c) => setKeepAspect(c === true)}
              />
              <label htmlFor="keep-aspect" className="text-sm text-gray-600 cursor-pointer">
                Maintain aspect ratio
              </label>
            </div>

            {processing && (
              <div className="flex items-center justify-center py-4">
                <RefreshCw className="h-5 w-5 animate-spin text-primary" />
                <span className="ml-2 text-sm text-gray-600">Resizing...</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Original ({originalWidth}×{originalHeight})</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[150px]">
                  <img src={originalUrl} alt="Original" loading="lazy" className="max-w-full max-h-40 object-contain" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Resized ({width}×{height})</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[150px]">
                  {resultUrl && (
                    <img src={resultUrl} alt="Resized" loading="lazy" className="max-w-full max-h-40 object-contain" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {downloadBlob && (
                <DownloadSection
                  data={downloadBlob}
                  filename={(file?.name?.replace(/\.[^.]+$/, '') || 'image') + `-${width}x${height}`}
                  mimeType="image/png"
                  label="Download Resized"
                />
              )}
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Image
              </Button>
            </div>
          </div>
        )}

        {!file && !originalUrl && (
          <p className="text-center text-xs text-gray-500">
            Upload an image to resize it to your desired dimensions
          </p>
        )}
      </div>
    </div>
  );
}


