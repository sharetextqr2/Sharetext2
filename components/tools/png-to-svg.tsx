'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function PngToSvg() {
  const [file, setFile] = useState<File | null>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const convert = useCallback(async (f: File) => {
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', f);

      const res = await fetch('/api/png-to-svg', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Conversion failed');
      }

      const svgText = await res.text();
      setSvg(svgText);
      toast.success('Image converted to SVG!');
    } catch {
      toast.error('Failed to convert image. Please try a different file.');
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setSvg(null);
    convert(f);
  }, [convert]);

  const reset = () => {
    setFile(null);
    setSvg(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">PNG to SVG Converter</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={handleFile}
          validation={{ maxSizeMB: 20, acceptedTypes: ['.png', 'image/png', '.jpg', 'image/jpeg', '.jpeg', '.webp', 'image/webp'] }}
          label="Drop an image here or click to browse"
        />

        {processing && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-3 text-sm text-gray-600">Tracing image to SVG...</span>
          </div>
        )}

        {svg && !processing && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">SVG Preview</h3>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-center min-h-[200px]">
              <div
                className="max-w-full max-h-64"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <DownloadSection
                data={svg}
                filename={file?.name?.replace(/\.[^.]+$/i, '') || 'converted'}
                mimeType="image/svg+xml"
                label="Download SVG"
              />
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Convert Another
              </Button>
            </div>
          </div>
        )}

        {!file && !processing && !svg && (
          <p className="text-center text-xs text-gray-500">
            Upload a PNG, JPG or WebP image to convert it to a scalable SVG vector
          </p>
        )}
      </div>
    </div>
  );
}
