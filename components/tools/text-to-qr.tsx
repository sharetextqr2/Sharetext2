'use client';

import React, { useState, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, RefreshCw, ArrowRight, ExternalLink, AlertCircle, QrCode, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';
import { copyToClipboard } from '@/lib/utils';

function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function TextToQR() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const [envError, setEnvError] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) return;
    setGenerating(true);
    setEnvError(false);

    try {
      let supabase;
      try {
        supabase = getSupabase();
      } catch {
        setEnvError(true);
        setGenerating(false);
        return;
      }

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
          if (err2) {
            toast.error('Failed to save text. Please try again.');
            setGenerating(false);
            return;
          }
          setQrUrl(`${window.location.origin}/view/${shortId2}`);
        } else {
          toast.error(error.message || 'Failed to save text. Please try again.');
          setGenerating(false);
          return;
        }
      } else {
        setQrUrl(`${window.location.origin}/view/${shortId}`);
      }

      setShowQR(true);
      toast.success('QR code generated successfully!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      console.error('Generate QR error:', err);
      toast.error(message);
    } finally {
      setGenerating(false);
    }
  }, [text]);

  const handleDownload = useCallback(() => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'sharetextqr-code.png';
      a.click();
      toast.success('QR code downloaded!');
    };
    img.src = url;
  }, []);

  const handleClear = useCallback(() => {
    setText('');
    setShowQR(false);
    setCopied(false);
    setQrUrl('');
    setEnvError(false);
  }, []);

  const handleCopyLink = useCallback(async () => {
    const ok = await copyToClipboard(qrUrl);
    if (ok) {
      setCopied(true);
      toast.success('Copied successfully');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Unable to copy. Please copy manually.');
    }
  }, [qrUrl]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center shrink-0">
          <QrCode className="h-5 w-5 text-[#2563EB]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Text to QR Generator</h2>
          <p className="text-sm text-gray-500">Convert text into a QR code instantly.</p>
        </div>
      </div>
      <div className="border-t border-gray-100 mb-6" />

      {envError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Supabase not configured</p>
            <p className="text-sm text-red-600 mt-1">
              Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables to enable text sharing.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-5">
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
            <Button
              onClick={handleGenerate}
              disabled={!text.trim() || generating}
              className="flex-1 h-[52px] rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] shadow-lg shadow-blue-900/20"
            >
              {generating ? (
                <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
              ) : (
                <><QrCode className="mr-2 h-4 w-4" /> Generate QR <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{text.length} characters</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Unlimited text supported</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {showQR && qrUrl ? (
            <div className="w-full aspect-square max-w-[280px] mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300" style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div ref={qrRef} className="p-6">
                <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin={false} />
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square max-w-[280px] mx-auto bg-[#EFF6FF] rounded-2xl border-2 border-dashed border-[#BFDBFE] flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#DBEAFE] flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-[#2563EB]" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Your QR Code</p>
                <p className="text-xs text-gray-500">Generate a QR code to preview and download.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showQR && qrUrl && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-5">
            <span className="font-medium">Share URL:</span>
            <code className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs break-all max-w-[300px]">
              {qrUrl}
            </code>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleDownload} className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]">
              <Download className="h-4 w-4" />
              Download PNG
            </Button>
            <Button variant="outline" onClick={handleCopyLink} className="gap-2">
              {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a href={qrUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Share
              </a>
            </Button>
            <Button variant="outline" onClick={handleClear} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-5">
            Scan the QR code to open this text on another device
          </p>
        </div>
      )}
    </div>
  );
}
