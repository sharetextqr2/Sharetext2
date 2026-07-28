'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Copy, Check, Download, RefreshCw, FileText,
  Eye, AlignLeft, Code,
} from 'lucide-react';
import { toast } from 'sonner';
import { performOcr } from '@/services/ocrService';
import type { OcrProgress, OcrResult } from '@/types/ocr';

type TabId = 'preview' | 'formatted' | 'plain' | 'json';

export default function ImageToText() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('formatted');
  const [result, setResult] = useState<OcrResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progressMsg, setProgressMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const onProgress = useCallback((p: OcrProgress) => {
    setProgressMsg(p.message);
  }, []);

  const ocrImage = useCallback(async (f: File) => {
    setFile(f);
    setProcessing(true);
    setResult(null);
    setProgressMsg('Preparing Image...');
    setActiveTab('formatted');
    setCopied(false);

    const preview = URL.createObjectURL(f);
    setPreviewUrl(preview);

    try {
      const ocrResult = await performOcr(f, onProgress);
      setResult(ocrResult);
      toast.success('Text extracted successfully!');

      if (!ocrResult.text.trim()) {
        toast.error('No text could be extracted. Try a clearer image.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'OCR processing failed';
      toast.error(msg);
      console.error('[OCR]', err);
    } finally {
      setProcessing(false);
      setProgressMsg('');
    }
  }, [onProgress]);

  const handleCopy = async () => {
    if (!result) return;
    let content = result.text;
    if (activeTab === 'formatted') content = result.formattedHtml;
    else if (activeTab === 'json') content = result.rawJson;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const dl = (content: string, ext: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'extracted') + ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadTxt = () => result && dl(result.text, '.txt', 'text/plain');
  const downloadHtml = () => result && dl(result.formattedHtml, '.html', 'text/html');
  const downloadJson = () => result && dl(result.rawJson, '.json', 'application/json');

  const reset = () => {
    setFile(null);
    setResult(null);
    setPreviewUrl(null);
    setProcessing(false);
    setProgressMsg('');
    setCopied(false);
  };

  const label = (): string => {
    switch (activeTab) {
      case 'preview': return 'Preview';
      case 'formatted': return 'Formatted Text';
      case 'plain': return 'Plain Text';
      case 'json': return 'Raw JSON';
    }
  };

  const tabContent = () => {
    switch (activeTab) {
      case 'preview':
        return previewUrl ? (
          <div className="flex items-center justify-center min-h-[200px] bg-gray-50 rounded-xl border border-gray-200 p-2">
            <img src={previewUrl} alt="Source" className="max-w-full max-h-96 rounded-lg object-contain" />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] text-gray-400 text-sm">No preview available</div>
        );
      case 'formatted':
        return result?.formattedHtml ? (
          <div className="min-h-[200px] max-h-[500px] overflow-auto bg-white rounded-xl border border-gray-200 p-4">
            <div
              className="ocr-render"
              dangerouslySetInnerHTML={{ __html: result.formattedHtml }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[200px] text-gray-400 text-sm">No document</div>
        );
      case 'plain':
        return (
          <Textarea readOnly value={result?.text || ''} className="min-h-[200px] max-h-[500px] font-mono text-sm" />
        );
      case 'json':
        return (
          <Textarea readOnly value={result?.rawJson || ''} className="min-h-[200px] max-h-[500px] font-mono text-sm" />
        );
    }
  };

  const TAB_ITEMS = [
    { id: 'preview' as TabId, label: 'Preview', icon: Eye },
    { id: 'formatted' as TabId, label: 'Formatted Text', icon: FileText },
    { id: 'plain' as TabId, label: 'Plain Text', icon: AlignLeft },
    { id: 'json' as TabId, label: 'Raw JSON', icon: Code },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Image to Text (OCR)</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={ocrImage}
          validation={{
            maxSizeMB: 20,
            acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.tiff', 'image/'],
          }}
          label="Drop an image here or click to browse"
        />

        {processing && (
          <div className="flex items-center justify-center py-8 bg-gray-50 rounded-xl border border-gray-200">
            <RefreshCw className="h-5 w-5 animate-spin text-primary" />
            <span className="ml-3 text-sm text-gray-700">{progressMsg || 'Processing...'}</span>
          </div>
        )}

        {result && !processing && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">{label()}</h3>
              <div className="flex items-center gap-3">
                {result.processingTime > 0 && (
                  <span className="text-xs text-gray-400">{result.processingTime}ms</span>
                )}
                <span className="text-xs text-gray-500">{result.text.length} characters</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-1">
              {TAB_ITEMS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'text-primary border-primary bg-primary/5'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {tabContent()}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleCopy} className="gap-2 text-xs h-9">
                {copied ? (
                  <><Check className="h-3.5 w-3.5 text-green-500" /> Copied!</>
                ) : (
                  <><Copy className="h-3.5 w-3.5" /> Copy</>
                )}
              </Button>
              <Button variant="outline" onClick={downloadTxt} className="gap-2 text-xs h-9">
                <Download className="h-3.5 w-3.5" /> TXT
              </Button>
              <Button variant="outline" onClick={downloadHtml} className="gap-2 text-xs h-9">
                <Download className="h-3.5 w-3.5" /> HTML
              </Button>
              <Button variant="outline" onClick={downloadJson} className="gap-2 text-xs h-9">
                <Download className="h-3.5 w-3.5" /> JSON
              </Button>
              <Button variant="outline" onClick={reset} className="gap-2 text-xs h-9">
                <RefreshCw className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
        )}

        {!file && !processing && !result && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Upload an image with text to extract it using OCR
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
