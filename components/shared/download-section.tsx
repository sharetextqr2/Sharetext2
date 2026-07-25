'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DownloadSectionProps {
  data: Blob | string;
  filename: string;
  mimeType?: string;
  label?: string;
}

export function DownloadSection({ data, filename, mimeType, label }: DownloadSectionProps) {
  const handleDownload = () => {
    const blob = typeof data === 'string'
      ? new Blob([data], { type: mimeType || 'text/plain' })
      : data;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} variant="default" className="gap-2">
      <Download className="h-4 w-4" />
      {label || 'Download'}
    </Button>
  );
}
