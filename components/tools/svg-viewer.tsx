'use client';

import React, { useState, useRef, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2, RefreshCw, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { DownloadSection } from '@/components/shared/download-section';

export default function SvgViewer() {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleFile = useCallback((f: File) => {
    setError(null);
    setLoading(true);
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text || !text.trim().startsWith('<svg')) {
        setError('The file does not appear to be a valid SVG image.');
        setSvgContent(null);
        setLoading(false);
        return;
      }
      setSvgContent(text);
      setZoom(1);
      setLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read the SVG file. Please try again.');
      setLoading(false);
    };
    reader.readAsText(f);
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.25));
  const fitToScreen = () => setZoom(1);
  const fullSize = () => setZoom(2);

  const reset = () => {
    setSvgContent(null);
    setFileName('');
    setZoom(1);
    setLoading(false);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">SVG Viewer</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={handleFile}
          validation={{ maxSizeMB: 10, acceptedTypes: ['.svg', 'image/svg+xml'] }}
          label="Drop an SVG file here or click to browse"
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-gray-500">Loading SVG file...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" size="sm" onClick={reset} className="mt-4">
              Try another file
            </Button>
          </div>
        )}

        {svgContent && !loading && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-gray-700">
                {fileName}
                <span className="ml-2 text-xs text-gray-500">
                  {(new Blob([svgContent]).size / 1024).toFixed(1)} KB
                </span>
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={zoomOut} aria-label="Zoom out">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 min-w-[4ch] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button variant="outline" size="icon" onClick={zoomIn} aria-label="Zoom in">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={fitToScreen} className="gap-1">
                  <Maximize2 className="h-3 w-3" />
                  Fit
                </Button>
                <Button variant="outline" size="sm" onClick={fullSize} className="gap-1">
                  <Maximize2 className="h-3 w-3" />
                  2x
                </Button>
                <Button variant="outline" size="icon" onClick={reset} aria-label="Upload another">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              ref={viewerRef}
              className="bg-white rounded-xl border border-gray-200 overflow-auto flex items-center justify-center min-h-[400px] max-h-[70vh]"
            >
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center center',
                }}
                className="transition-transform duration-200"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                Use the zoom controls to inspect SVG details
              </p>
              <DownloadSection
                data={svgContent}
                filename={fileName?.replace(/\.svg$/i, '') || 'viewed'}
                mimeType="image/svg+xml"
                label="Download SVG"
              />
            </div>
          </div>
        )}

        {!svgContent && !loading && !error && (
          <p className="text-center text-xs text-gray-500">
            Upload an SVG file to view and inspect it
          </p>
        )}
      </div>
    </div>
  );
}
