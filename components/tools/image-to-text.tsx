'use client';

import React, { useState, useCallback } from 'react';
import { ImageUpload } from '@/components/shared/image-upload';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Download, RefreshCw, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageToText() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const ocrImage = useCallback(async (f: File) => {
    setFile(f);
    setProcessing(true);
    setText('');

    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng');
      const { data } = await worker.recognize(f);
      setText(data.text);
      await worker.terminate();
      toast.success('Text extracted successfully!');
    } catch {
      toast.error('OCR processing failed. Please try another image.');
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (file?.name?.replace(/\.[^.]+$/, '') || 'extracted') + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setText('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Image to Text (OCR)</h2>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <ImageUpload
          onFile={ocrImage}
          validation={{ maxSizeMB: 20, acceptedTypes: ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.tiff', 'image/'] }}
          label="Drop an image here or click to browse"
        />

        {processing && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-primary" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Processing OCR...</p>
              <p className="text-xs text-gray-500">This may take a moment</p>
            </div>
          </div>
        )}

        {text && !processing && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Extracted Text</h3>
              <span className="text-xs text-gray-500">{text.length} characters</span>
            </div>
            <Textarea
              readOnly
              value={text}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleCopy} className="gap-2">
                {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Text</>}
              </Button>
              <Button variant="outline" onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Download .txt
              </Button>
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Image
              </Button>
            </div>
          </div>
        )}

        {!file && !processing && !text && (
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
