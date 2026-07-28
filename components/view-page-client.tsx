'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Copy, Check, ArrowLeft, CircleAlert as AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getSupabase } from '@/lib/supabase';
import { copyToClipboard } from '@/lib/utils';

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
          setError(true);
          setLoading(false);
          return;
        }

        const { data, error } = await getSupabase()
          .from('shared_texts')
          .select('content')
          .eq('short_id', shortId)
          .maybeSingle();

        if (error) {
          setError(true);
        } else if (!data) {
          setError(true);
        } else {
          setText(data.content);
        }
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }

    fetchText();
  }, [params.id]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      toast.success('Copied successfully');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Unable to copy. Please copy manually.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Text Not Found
            </h1>
            <p className="text-gray-500 mb-6">
              The shared text you are looking for does not exist or has expired.
            </p>
            <Button asChild variant="outline">
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </a>
            </Button>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl">
        <Card className="overflow-hidden border-0 shadow-lg shadow-primary/5">
          <div className="bg-primary px-6 py-5 md:px-8 md:py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-2.5">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Shared Text</h1>
                <p className="text-white/80 text-sm">Copy this text to your device</p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 md:p-8">
            <div className="relative">
              <textarea
                readOnly
                value={text}
                className="w-full min-h-[200px] p-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 resize-none focus:outline-none text-base leading-relaxed font-mono"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1 h-12 text-base"
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
                <a href="/text-to-qr">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Create New Share
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
