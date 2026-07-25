'use client';

import React, { useState, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, RefreshCw, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';

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

  const handleCreateNew = useCallback(() => {
    setText('');
    setShowQR(false);
    setCopied(false);
    setQrUrl('');
    setEnvError(false);
  }, []);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  }, [qrUrl]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Text to QR Generator</h2>
      </div>

      <div className="p-6 md:p-8">
        {envError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Supabase not configured</p>
              <p className="text-sm text-red-600 mt-1">
                Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables to enable text sharing.
              </p>
            </div>
          </div>
        )}

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
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <span className="font-medium">Share URL:</span>
              <code className="px-2 py-1 bg-gray-100 rounded text-xs break-all max-w-[300px]">
                {qrUrl}
              </code>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" onClick={handleCopyLink} className="gap-2">
                {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Link</>}
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a href={qrUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Share
                </a>
              </Button>
              <Button variant="outline" onClick={handleCreateNew} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Create New
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
