'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function SvgToPng() {
  const [file, setFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);

  const convert = useCallback((f: File) => {
    setProcessing(true);
    setFile(f);
    setPngUrl(null);
    setDownloadBlob(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const svgText = e.target?.result as string;
      if (!svgText) {
        toast.error('Failed to read SVG file.');
        setProcessing(false);
        return;
      }
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas not supported');

        const img = new Image();
        const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);
            resolve();
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to render SVG'));
          };
          img.src = url;
        });

        canvas.toBlob((b) => {
          if (!b) {
            toast.error('Failed to generate PNG.');
            setProcessing(false);
            return;
          }
          setPngUrl(URL.createObjectURL(b));
          setDownloadBlob(b);
          toast.success('SVG converted to PNG!');
          setProcessing(false);
        }, 'image/png');
      } catch {
        toast.error('Failed to convert SVG. Please try a different file.');
        setProcessing(false);
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read file.');
      setProcessing(false);
    };
    reader.readAsText(f);
  }, []);

  const reset = () => {
    setFile(null);
    if (pngUrl) URL.revokeObjectURL(pngUrl);
    setPngUrl(null);
    setDownloadBlob(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">SVG to PNG Converter</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={convert}
          validation={{ maxSizeMB: 10, acceptedTypes: ['.svg', 'image/svg+xml'] }}
          label="Drop an SVG file here or click to browse"
        />

        {processing && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-3 text-sm text-gray-600">Converting to PNG...</span>
          </div>
        )}

        {pngUrl && !processing && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">PNG Preview</h3>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center min-h-[200px]">
              <img src={pngUrl} alt="PNG preview" loading="lazy" className="max-w-full max-h-64 object-contain" />
            </div>
            <div className="flex flex-wrap gap-3">
              {downloadBlob && (
                <DownloadSection
                  data={downloadBlob}
                  filename={file?.name?.replace(/\.svg$/i, '') || 'converted'}
                  mimeType="image/png"
                  label="Download PNG"
                />
              )}
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Convert Another
              </Button>
            </div>
          </div>
        )}

        {!file && !processing && !pngUrl && (
          <p className="text-center text-xs text-gray-500">
            Upload an SVG file to convert it to a PNG image
          </p>
        )}
      </div>
    </div>
  );
}


