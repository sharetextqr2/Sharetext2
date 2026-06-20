'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowLeft, CircleAlert as AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function ViewPageClient() {
  const params = useParams();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchText() {
      try {
        const shortId = params.id as string;

        if (!shortId || shortId.length < 4) {
          console.error('Invalid short ID:', shortId);
          setError(true);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('shared_texts')
          .select('content')
          .eq('short_id', shortId)
          .maybeSingle();

        if (error) {
          console.error('Fetch error:', error);
          setError(true);
        } else if (!data) {
          console.log('No data found for short ID:', shortId);
          setError(true);
        } else {
          setText(data.content);
        }
        setLoading(false);
      } catch (err) {
        console.error('Unexpected error fetching text:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchText();
  }, [params.id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy text');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Text Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The shared text you are looking for does not exist or has expired.
          </p>
          <Button asChild variant="outline">
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="overflow-hidden shadow-lg border-0 bg-white dark:bg-gray-900">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Shared Text</h1>
                <p className="text-white/80 text-sm">Copy this text to your device</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="relative">
              <textarea
                readOnly
                value={text}
                className="w-full min-h-[200px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:outline-none text-base leading-relaxed font-mono"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1 h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-90 text-white font-medium text-base transition-all"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-5 w-5" />
                    Copy Text
                  </>
                )}
              </Button>
              <Button asChild variant="outline" className="h-12 px-6">
                <a href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Create New
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
