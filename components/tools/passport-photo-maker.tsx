'use client';

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { DownloadSection } from '@/components/shared/download-section';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RefreshCw, Printer, Download, LayoutGrid, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { SIZE_OPTIONS, COPY_COUNTS } from '@/lib/passport-utils';
import { cropToPassport, renderA4Sheet } from '@/lib/canvas-utils';
import { downloadPng, downloadPdf, printA4 } from '@/lib/passport-print';
import PassportCropper from './passport/PassportCropper';
import type { Area } from 'react-easy-crop';

function mmToPx(mm: number): number {
  return Math.round((mm / 25.4) * 300);
}

const defaultPrintOpts = { copyCount: 8, showCutGuides: true };

export default function PassportPhotoMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0].label);
  const [customWidthMm, setCustomWidthMm] = useState('35');
  const [customHeightMm, setCustomHeightMm] = useState('45');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [printOpts, setPrintOpts] = useState(defaultPrintOpts);
  const [a4PreviewUrl, setA4PreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const passportCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTag = useRef(0);

  const isCustom = selectedSize === '🌍 Select Custom Size...';

  const customWidth = parseFloat(customWidthMm);
  const customHeight = parseFloat(customHeightMm);
  const customValid = customWidth > 0 && customHeight > 0 && customWidth <= 100 && customHeight <= 100;

  const activeSize = useMemo(() => {
    if (isCustom) {
      if (!customValid) return null;
      return { width: mmToPx(customWidth), height: mmToPx(customHeight) };
    }
    const opt = SIZE_OPTIONS.find((s) => s.label === selectedSize);
    return opt ? { width: opt.width, height: opt.height } : null;
  }, [selectedSize, isCustom, customValid, customWidth, customHeight]);

  const aspectRatio = activeSize ? activeSize.width / activeSize.height : 1;

  const renderPassport = useCallback(() => {
    const img = imgRef.current;
    if (!img || !croppedAreaPixels || !activeSize) return;
    try {
      const canvas = cropToPassport(img, croppedAreaPixels, activeSize.width, activeSize.height);
      passportCanvasRef.current = canvas;
      canvas.toBlob((b) => {
        if (!b) return;
        setDownloadBlob(b);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(URL.createObjectURL(b));
      }, 'image/png');
    } catch {
      setError('Failed to render passport photo.');
    }
  }, [croppedAreaPixels, activeSize, resultUrl]);

  const renderA4 = useCallback(() => {
    const src = passportCanvasRef.current;
    if (!src || !showPrint) return;
    const tag = ++renderTag.current;
    try {
      const canvas = renderA4Sheet(src, printOpts.copyCount, printOpts.showCutGuides);
      canvas.toBlob((b) => {
        if (!b || tag !== renderTag.current) return;
        if (a4PreviewUrl) URL.revokeObjectURL(a4PreviewUrl);
        setA4PreviewUrl(URL.createObjectURL(b));
      }, 'image/png');
    } catch {
      setError('Failed to render A4 layout.');
    }
  }, [showPrint, printOpts, a4PreviewUrl]);

  useEffect(() => {
    if (imgRef.current && croppedAreaPixels && activeSize) {
      renderPassport();
    }
  }, [renderPassport, croppedAreaPixels, activeSize]);

  useEffect(() => {
    if (passportCanvasRef.current && showPrint) {
      requestAnimationFrame(() => renderA4());
    }
  }, [renderA4, printOpts, showPrint]);

  const handleFile = useCallback((f: File) => {
    setLoading(true);
    setError(null);
    setFile(f);
    setResultUrl(null);
    setDownloadBlob(null);
    setShowPrint(false);
    setA4PreviewUrl(null);
    setCroppedAreaPixels(null);
    passportCanvasRef.current = null;
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));

    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      URL.revokeObjectURL(url);
      imgRef.current = img;
      setLoading(false);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('Failed to load image. Try a different file.');
      setLoading(false);
    };
    img.src = url;
  }, [originalUrl]);

  const handleCropComplete = useCallback((area: Area) => {
    setCroppedAreaPixels(area);
  }, []);

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    setCroppedAreaPixels(null);
  };

  const reset = useCallback(() => {
    imgRef.current = null;
    passportCanvasRef.current = null;
    setFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    if (a4PreviewUrl) URL.revokeObjectURL(a4PreviewUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    setDownloadBlob(null);
    setSelectedSize(SIZE_OPTIONS[0].label);
    setCustomWidthMm('35');
    setCustomHeightMm('45');
    setCroppedAreaPixels(null);
    setShowPrint(false);
    setA4PreviewUrl(null);
    setPrintOpts(defaultPrintOpts);
    setError(null);
  }, [originalUrl, resultUrl, a4PreviewUrl]);

  const updatePrintOpts = useCallback((patch: Partial<typeof printOpts>) => {
    setPrintOpts((p) => ({ ...p, ...patch }));
  }, []);

  const togglePrint = useCallback(() => {
    setShowPrint((p) => !p);
  }, []);

  const exportA4 = useCallback((type: 'png' | 'pdf') => {
    const src = passportCanvasRef.current;
    if (!src || !activeSize) return;
    const name = (file?.name?.replace(/\.[^.]+$/, '') || 'passport') + '-a4';
    const canvas = renderA4Sheet(src, printOpts.copyCount, printOpts.showCutGuides);
    if (type === 'png') downloadPng(canvas, name);
    else downloadPdf(canvas, name);
  }, [file, activeSize, printOpts]);

  const handlePrint = useCallback(() => {
    const src = passportCanvasRef.current;
    if (!src || !activeSize) return;
    const canvas = renderA4Sheet(src, printOpts.copyCount, printOpts.showCutGuides);
    printA4(canvas);
  }, [activeSize, printOpts]);

  const customSizeError = isCustom && customWidthMm && customHeightMm && !customValid;
  const showResult = resultUrl && !loading && !error;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Passport Photo Crop & Print</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {!file && !originalUrl && (
          <>
            <ImageUpload
              onFile={handleFile}
              validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', 'image/'] }}
              label="Drop a photo here or click to browse"
            />
            <p className="text-center text-xs text-gray-500">
              Upload a photo to crop it to standard passport sizes and arrange on A4 for printing.
            </p>
          </>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {error}
            <button
              type="button"
              onClick={() => setError(null)}
              className="ml-2 underline"
              aria-label="Dismiss error"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-3 text-sm text-gray-600">Loading image...</span>
          </div>
        )}

        {(file || originalUrl) && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={reset} className="gap-2">
                <Upload className="h-4 w-4" />
                New Photo
              </Button>
              {!isCustom && activeSize && (
                <span className="text-xs text-gray-500">
                  {activeSize.width} × {activeSize.height} px
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-1.5 min-w-[240px] flex-1">
                <label htmlFor="size" className="text-sm font-medium text-gray-700">
                  Passport Size
                </label>
                <Select value={selectedSize} onValueChange={handleSizeChange}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {SIZE_OPTIONS.map((s) => (
                      <SelectItem key={s.label} value={s.label}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {isCustom && (
                <div className="flex gap-3 items-end">
                  <div className="space-y-1">
                    <label htmlFor="cw" className="text-xs font-medium text-gray-600">Width (mm)</label>
                    <Input
                      id="cw"
                      type="number"
                      min="1"
                      max="100"
                      step="0.5"
                      value={customWidthMm}
                      onChange={(e) => setCustomWidthMm(e.target.value)}
                      className="w-20 h-9"
                      aria-label="Custom width in millimetres"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="ch" className="text-xs font-medium text-gray-600">Height (mm)</label>
                    <Input
                      id="ch"
                      type="number"
                      min="1"
                      max="100"
                      step="0.5"
                      value={customHeightMm}
                      onChange={(e) => setCustomHeightMm(e.target.value)}
                      className="w-20 h-9"
                      aria-label="Custom height in millimetres"
                    />
                  </div>
                </div>
              )}
            </div>

            {customSizeError && (
              <p className="text-xs text-red-500">
                Enter dimensions between 1 and 100 mm.
              </p>
            )}

            {originalUrl && activeSize && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2 min-w-0">
                  <p className="text-xs font-medium text-gray-500">Crop & Adjust</p>
                  <PassportCropper
                    imageUrl={originalUrl}
                    aspectRatio={aspectRatio}
                    onCropComplete={handleCropComplete}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2 min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    Passport Preview
                    {activeSize && ` (${activeSize.width}×${activeSize.height})`}
                  </p>
                  <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-center min-h-[240px] lg:min-h-[300px]">
                    {resultUrl ? (
                      <img
                        src={resultUrl}
                        alt="Passport preview"
                        className="max-w-full max-h-56 object-contain shadow-sm rounded"
                      />
                    ) : (
                      <p className="text-xs text-gray-400">Adjust the crop to see preview</p>
                    )}
                  </div>

                  {downloadBlob && resultUrl && (
                    <div className="pt-2">
                      <DownloadSection
                        data={downloadBlob}
                        filename={(file?.name?.replace(/\.[^.]+$/, '') || 'photo') + '-passport'}
                        mimeType="image/png"
                        label="Download Passport Photo"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {resultUrl && (
              <div className="border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={togglePrint}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={showPrint}
                  aria-controls="a4-panel"
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-gray-800">Print on A4</span>
                  </div>
                  {showPrint ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {showPrint && (
                  <div id="a4-panel" className="mt-4 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-2 space-y-5">
                        <div className="space-y-2">
                          <label htmlFor="photo-count" className="text-sm font-medium text-gray-700">
                            Number of Photos
                          </label>
                          <Select
                            value={String(printOpts.copyCount)}
                            onValueChange={(v) => updatePrintOpts({ copyCount: Number(v) })}
                          >
                            <SelectTrigger id="photo-count" className="w-full">
                              <SelectValue placeholder="Select count" />
                            </SelectTrigger>
                            <SelectContent>
                              {COPY_COUNTS.map((n) => (
                                <SelectItem key={n} value={String(n)}>{n} photos</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="cut-guides"
                            checked={printOpts.showCutGuides}
                            onCheckedChange={(v) => updatePrintOpts({ showCutGuides: v === true })}
                          />
                          <Label htmlFor="cut-guides" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Show cut guides
                          </Label>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button
                            onClick={() => exportA4('png')}
                            variant="default"
                            className="gap-2 text-xs h-9"
                            aria-label="Download A4 sheet as PNG"
                          >
                            <Download className="h-3.5 w-3.5" /> PNG
                          </Button>
                          <Button
                            onClick={() => exportA4('pdf')}
                            variant="default"
                            className="gap-2 text-xs h-9"
                            aria-label="Download A4 sheet as PDF"
                          >
                            <Download className="h-3.5 w-3.5" /> PDF
                          </Button>
                          <Button
                            onClick={handlePrint}
                            variant="outline"
                            className="gap-2 text-xs h-9"
                            aria-label="Print A4 sheet"
                          >
                            <Printer className="h-3.5 w-3.5" /> Print
                          </Button>
                        </div>
                      </div>

                      <div className="lg:col-span-3">
                        <p className="text-xs font-medium text-gray-500 mb-2">A4 Preview</p>
                        <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-center justify-center min-h-[300px]">
                          {a4PreviewUrl ? (
                            <img
                              src={a4PreviewUrl}
                              alt="A4 layout preview"
                              className="max-w-full max-h-[500px] rounded shadow-sm object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 text-sm">
                              <LayoutGrid className="h-8 w-8" />
                              <span>Select number of photos</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
