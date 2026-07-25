'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type CameraState = 'loading' | 'idle' | 'streaming' | 'denied' | 'unavailable' | 'unsupported';

export default function ScanQR() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [decodedText, setDecodedText] = useState('');
  const [copied, setCopied] = useState(false);
  const animFrameRef = useRef<number>(0);

  const isUrl = decodedText.startsWith('http://') || decodedText.startsWith('https://');

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraState('idle');
  }, []);

  const startCamera = useCallback(async () => {
    setCameraState('loading');
    setDecodedText('');

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraState('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState('streaming');
      scanFrame();
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraState('denied');
      } else {
        setCameraState('unavailable');
      }
    }
  }, []);

  const scanFrame = useCallback(async () => {
    if (!videoRef.current || cameraState !== 'streaming') return;

    const video = videoRef.current;
    if (video.readyState !== video.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    try {
      const { default: jsQR } = await import('jsqr');
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setDecodedText(code.data);
        stopCamera();
        toast.success('QR code detected!');
        return;
      }
    } catch {
      // jsQR error, continue scanning
    }

    animFrameRef.current = requestAnimationFrame(scanFrame);
  }, [cameraState, stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(decodedText);
    setCopied(true);
    toast.success('Text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Scan QR with Webcam</h2>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Camera Preview
              </label>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
                {cameraState === 'streaming' ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : cameraState === 'loading' ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <RefreshCw className="h-8 w-8 animate-spin" />
                    <p className="text-sm">Accessing camera...</p>
                  </div>
                ) : cameraState === 'denied' ? (
                  <div className="flex flex-col items-center gap-2 text-red-400 p-4 text-center">
                    <CameraOff className="h-8 w-8" />
                    <p className="text-sm font-medium">Camera permission denied</p>
                    <p className="text-xs text-gray-500">Please allow camera access in your browser settings.</p>
                  </div>
                ) : cameraState === 'unavailable' ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400 p-4 text-center">
                    <CameraOff className="h-8 w-8" />
                    <p className="text-sm font-medium">Camera unavailable</p>
                    <p className="text-xs text-gray-500">No camera detected on this device.</p>
                  </div>
                ) : cameraState === 'unsupported' ? (
                  <div className="flex flex-col items-center gap-2 text-gray-400 p-4 text-center">
                    <CameraOff className="h-8 w-8" />
                    <p className="text-sm font-medium">Browser not supported</p>
                    <p className="text-xs text-gray-500">Camera access is not available in this browser.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Camera className="h-8 w-8" />
                    <p className="text-sm">Camera preview will appear here</p>
                  </div>
                )}

                {cameraState === 'streaming' && (
                  <div className="absolute inset-0 border-2 border-primary/30 rounded-xl pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary/50 rounded-lg" />
                  </div>
                )}
              </div>

              {cameraState === 'idle' || cameraState === 'denied' || cameraState === 'unavailable' || cameraState === 'unsupported' ? (
                <Button onClick={startCamera} className="w-full mt-4">
                  <Camera className="mr-2 h-4 w-4" />
                  Start Camera
                </Button>
              ) : cameraState === 'streaming' ? (
                <Button onClick={stopCamera} variant="outline" className="w-full mt-4">
                  <CameraOff className="mr-2 h-4 w-4" />
                  Stop Camera
                </Button>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decoded Content
            </label>
            <div className="min-h-[200px] p-4 rounded-xl border border-gray-200 bg-gray-50">
              {decodedText ? (
                <p className="text-sm text-gray-900 break-all font-mono">{decodedText}</p>
              ) : (
                <p className="text-sm text-gray-400">
                  {cameraState === 'streaming'
                    ? 'Point your camera at a QR code...'
                    : 'Scan a QR code to see the content here'}
                </p>
              )}
            </div>

            {decodedText && (
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCopy} variant="outline" className="gap-2">
                  {copied ? <><Check className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Text</>}
                </Button>
                {isUrl && (
                  <Button variant="outline" asChild className="gap-2">
                    <a href={decodedText} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open URL
                    </a>
                  </Button>
                )}
                <Button onClick={startCamera} variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Scan Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
