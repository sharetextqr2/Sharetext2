'use client';

import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface PassportCropperProps {
  imageUrl: string;
  aspectRatio: number;
  onCropComplete: (area: Area) => void;
  disabled?: boolean;
}

export default function PassportCropper({
  imageUrl,
  aspectRatio,
  onCropComplete,
  disabled,
}: PassportCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropChange = useCallback((c: Point) => {
    setCrop(c);
  }, []);

  const handleZoomChange = useCallback((z: number) => {
    setZoom(z);
  }, []);

  const handleCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete],
  );

  const reset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }, []);

  return (
    <div className="space-y-3">
      <div className="relative w-full" style={{ height: 'min(60vh, 420px)' }}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={handleCropChange}
          onZoomChange={handleZoomChange}
          onCropComplete={handleCropComplete}
          zoomWithScroll
          restrictPosition
          style={{
            containerStyle: {
              borderRadius: '0.75rem',
              background: '#f3f4f6',
            },
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="text-xs text-gray-500 w-10 shrink-0">Zoom</label>
        <Slider
          min={1}
          max={3}
          step={0.05}
          value={[zoom]}
          onValueChange={([v]) => setZoom(v)}
          disabled={disabled}
          aria-label="Zoom level"
        />
        <span className="text-xs text-gray-500 w-8 text-right tabular-nums">
          {zoom.toFixed(1)}x
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={disabled}
          aria-label="Reset crop"
          className="shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
