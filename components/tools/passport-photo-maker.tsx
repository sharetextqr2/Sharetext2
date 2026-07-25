'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface PassportSize {
  label: string;
  width: number;
  height: number;
  unit: string;
}

const sizes: PassportSize[] = [
  { label: 'US Passport (2×2 in)', width: 600, height: 600, unit: 'in' },
  { label: 'UK Passport (35×45 mm)', width: 413, height: 531, unit: 'mm' },
  { label: 'EU/ID (35×45 mm)', width: 413, height: 531, unit: 'mm' },
  { label: 'India (2×2 in)', width: 600, height: 600, unit: 'in' },
  { label: 'Canada (50×70 mm)', width: 591, height: 827, unit: 'mm' },
  { label: 'Australia (35×45 mm)', width: 413, height: 531, unit: 'mm' },
  { label: 'Japan (45×35 mm)', width: 531, height: 413, unit: 'mm' },
  { label: 'China (33×48 mm)', width: 390, height: 567, unit: 'mm' },
];

export default function PassportPhotoMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0].label);
  const [processing, setProcessing] = useState(false);

  const process = useCallback((f: File, sizeLabel: string) => {
    const size = sizes.find((s) => s.label === sizeLabel);
    if (!size) return;
    setProcessing(true);
    setFile(f);
    setResultUrl(null);
    setDownloadBlob(null);

    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Canvas not supported.');
        setProcessing(false);
        return;
      }

      const srcAspect = img.naturalWidth / img.naturalHeight;
      const dstAspect = size.width / size.height;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

      if (srcAspect > dstAspect) {
        sw = img.naturalHeight * dstAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / dstAspect;
        sy = (img.naturalHeight - sh) / 2;
      }

      canvas.width = size.width;
      canvas.height = size.height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size.width, size.height);

      canvas.toBlob((b) => {
        if (!b) {
          toast.error('Failed to generate passport photo.');
          setProcessing(false);
          return;
        }
        setDownloadBlob(b);
        setResultUrl(URL.createObjectURL(b));
        toast.success('Passport photo created!');
        setProcessing(false);
      }, 'image/jpeg', 0.95);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error('Failed to load image.');
      setProcessing(false);
    };
    img.src = url;
  }, [resultUrl]);

  const handleFile = useCallback((f: File) => {
    setResultUrl(null);
    setOriginalUrl(URL.createObjectURL(f));
    process(f, selectedSize);
  }, [selectedSize, process]);

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    if (file) process(file, value);
  };

  const reset = () => {
    setFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setDownloadBlob(null);
    setSelectedSize(sizes[0].label);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Passport Photo Maker</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={handleFile}
          validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', 'image/'] }}
          label="Drop a photo here or click to browse"
        />

        {originalUrl && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="size" className="text-sm font-medium text-gray-700">Passport Size</label>
              <Select value={selectedSize} onValueChange={handleSizeChange}>
                <SelectTrigger id="size" className="w-full sm:w-72">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map((s) => (
                    <SelectItem key={s.label} value={s.label}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {processing && (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-3 text-sm text-gray-600">Processing...</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Original Photo</p>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[200px]">
                  <img src={originalUrl} alt="Original" loading="lazy" className="max-w-full max-h-48 object-contain" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Passport Photo</p>
                <div className="bg-white rounded-xl border border-gray-200 p-2 flex items-center justify-center min-h-[200px]">
                  {resultUrl && (
                    <img src={resultUrl} alt="Passport photo" loading="lazy" className="max-w-full max-h-48 object-contain" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {downloadBlob && (
                <DownloadSection
                  data={downloadBlob}
                  filename={(file?.name?.replace(/\.[^.]+$/, '') || 'photo') + '-passport'}
                  mimeType="image/jpeg"
                  label="Download Passport Photo"
                />
              )}
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Photo
              </Button>
            </div>
          </div>
        )}

        {!file && !originalUrl && (
          <p className="text-center text-xs text-gray-500">
            Upload a photo to create a passport-size image
          </p>
        )}
      </div>
    </div>
  );
}


