'use client';

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, RefreshCw, ArrowRight, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function downloadQR(url: string, filename: string) {
  const canvas = document.createElement('canvas');
  const svg = document.querySelector('.qr-display svg') as SVGElement;
  if (!svg) return;
  const xml = new XMLSerializer().serializeToString(svg);
  const img = new window.Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  img.src = 'data:image/svg+xml;base64,' + btoa(xml);
}

export default function TextToQR() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setGenerating(true);
    try {
      const shortId = generateShortId();
      const { error } = await supabase
        .from('shared_texts')
        .insert({ short_id: shortId, content: text.trim() })
        .select('short_id')
        .single();

      if (error) {
        if (error.code === '23505') {
          const shortId2 = generateShortId();
          const { error: err2 } = await supabase
            .from('shared_texts')
            .insert({ short_id: shortId2, content: text.trim() });
          if (err2) throw new Error('Failed to save text. Please try again.');
          setQrUrl(`${window.location.origin}/view/${shortId2}`);
        } else {
          throw new Error(error.message || 'Failed to save text. Please try again.');
        }
      } else {
        setQrUrl(`${window.location.origin}/view/${shortId}`);
      }
      setShowQR(true);
      toast.success('QR code generated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate QR code.');
    } finally {
      setGenerating(false);
    }
  };

  const handleClear = () => {
    setText('');
    setShowQR(false);
    setCopied(false);
    setQrUrl('');
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadQR(qrUrl, 'sharetextqr.png');
    toast.success('QR code downloaded!');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Text to QR Generator</h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text
              </label>
              <Textarea
                id="text-input"
                placeholder="Paste notes, URLs, code snippets, messages, or any text you want to share..."
                value={text}
                onChange={(e) => { setText(e.target.value); setShowQR(false); }}
                className="min-h-[200px] resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleGenerate} disabled={!text.trim() || generating} className="flex-1">
                {generating ? (
                  <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                ) : (
                  <>Generate QR <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear} className="px-4">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{text.length} characters</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>Unlimited text supported</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full aspect-square max-w-[280px] mx-auto bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
              {showQR && qrUrl ? (
                <div ref={qrRef} className="p-6 qr-display">
                  <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin={false} />
                </div>
              ) : (
                <div className="text-center px-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Your QR code will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {showQR && qrUrl && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
              <Button variant="outline" onClick={handleCopyUrl} className="gap-2">
                {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Link</>}
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a href={qrUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Preview
                </a>
              </Button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              Scan the QR code to open this text on another device
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
