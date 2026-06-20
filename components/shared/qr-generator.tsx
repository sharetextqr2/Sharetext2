'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, RefreshCw, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface QRGeneratorProps {
  className?: string;
}

// Generate a random 8-character alphanumeric short ID
function generateShortId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function QRGenerator({ className }: QRGeneratorProps) {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = async () => {
    if (!text.trim()) return;

    setGenerating(true);
    try {
      const shortId = generateShortId();
      const { error, data } = await supabase
        .from('shared_texts')
        .insert({ short_id: shortId, content: text.trim() })
        .select('short_id')
        .single();

      if (error) {
        // If short_id collision, try once more
        if (error.code === '23505') {
          console.log('Short ID collision, retrying...');
          const shortId2 = generateShortId();
          const { error: err2 } = await supabase
            .from('shared_texts')
            .insert({ short_id: shortId2, content: text.trim() });
          if (err2) {
            console.error('Insert error on retry:', err2);
            throw new Error('Failed to save text. Please try again.');
          }
          const url = `${window.location.origin}/view/${shortId2}`;
          setQrUrl(url);
        } else {
          console.error('Insert error:', error);
          throw new Error(error.message || 'Failed to save text. Please try again.');
        }
      } else {
        const url = `${window.location.origin}/view/${shortId}`;
        setQrUrl(url);
      }

      setShowQR(true);
      toast.success('QR code generated successfully!');
    } catch (err: any) {
      console.error('QR generation error:', err);
      const message = err.message || 'Failed to generate QR code. Please check your connection and try again.';
      toast.error(message);
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

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(qrUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div className="relative">
        {/* Gradient Border */}
        <div className="absolute -inset-px bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 rounded-3xl opacity-75 blur-sm" />
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              <h3 className="text-lg font-semibold text-white">
                Text to QR Generator
              </h3>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="text-input"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Enter your text
                  </label>
                  <Textarea
                    id="text-input"
                    placeholder="Paste notes, URLs, code snippets, messages, or any text you want to share..."
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      setShowQR(false);
                    }}
                    className="min-h-[200px] resize-none border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerate}
                    disabled={!text.trim() || generating}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate QR
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="px-4"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{text.length} characters</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span>Unlimited text supported</span>
                </div>
              </div>

              {/* QR Display Section */}
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square max-w-[280px] mx-auto relative bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {showQR && qrUrl ? (
                      <motion.div
                        key="qr"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                      >
                        <QRCodeSVG
                          value={qrUrl}
                          size={200}
                          level="H"
                          includeMargin={false}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center px-6"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Your QR code will appear here
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {showQR && qrUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={handleCopyText}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Text
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCopyLink}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="gap-2"
                  >
                    <a href={qrUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Preview
                    </a>
                  </Button>
                </div>
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  Scan the QR code to open this text on another device with a copy button
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
