'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Copy, Check, ExternalLink, RefreshCw, Scan, Sun, SwitchCamera, Loader2, Smartphone, Globe, Wifi, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { copyToClipboard } from '@/lib/utils';
import jsQR from 'jsqr';

type CameraState = 'idle' | 'loading' | 'streaming' | 'denied' | 'unavailable' | 'unsupported' | 'detected';

function detectType(text: string): string {
  if (text.startsWith('http://') || text.startsWith('https://')) return 'URL';
  if (text.startsWith('WIFI:')) return 'WiFi';
  if (text.startsWith('mailto:')) return 'Email';
  if (text.startsWith('tel:')) return 'Phone';
  if (text.startsWith('MATMSG:')) return 'Email';
  if (text.startsWith('SMSTO:')) return 'SMS';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'Email';
  return 'Text';
}

export default function ScanQR() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isStreamingRef = useRef(false);
  const mountedRef = useRef(true);
  const scanLockRef = useRef(false);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [decodedText, setDecodedText] = useState('');
  const [detectedType, setDetectedType] = useState('Text');
  const [copied, setCopied] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [torchAvailable, setTorchAvailable] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const animFrameRef = useRef<number>(0);

  const isUrl = decodedText.startsWith('http://') || decodedText.startsWith('https://');

  useEffect(() => {
    mountedRef.current = true;
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoInputs = devices.filter(d => d.kind === 'videoinput');
        setHasMultipleCameras(videoInputs.length > 1);
      });
    }
    return () => {
      mountedRef.current = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isStreamingRef.current = false;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    const video = videoRef.current;
    if (video) {
      video.onloadedmetadata = null;
      video.onerror = null;
      video.srcObject = null;
    }
    setTorchOn(false);
    setTorchAvailable(false);
    setCameraState(prev => prev === 'detected' ? 'detected' : 'idle');
  }, []);

  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isStreamingRef.current || scanLockRef.current) return;

    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { animFrameRef.current = requestAnimationFrame(scanFrame); return; }
      ctx.drawImage(video, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code && !scanLockRef.current) {
        scanLockRef.current = true;
        isStreamingRef.current = false;
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

        const data = code.data;
        const isUrl = data.startsWith('http://') || data.startsWith('https://');
        const isShareTextUrl = isUrl && (
          data.includes('sharetextqr.com') ||
          data.includes('sharetextqr.vercel.app') ||
          data.includes('localhost')
        );

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
        }
        if (video) {
          video.onloadedmetadata = null;
          video.onerror = null;
          video.srcObject = null;
        }

        setDecodedText(data);
        setDetectedType(detectType(data));
        setTorchOn(false);
        setTorchAvailable(false);
        setCameraState('detected');

        toast.success('QR code detected!');

        if (isShareTextUrl) {
          if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
          redirectTimeoutRef.current = setTimeout(() => {
            const opened = window.open(data, '_blank', 'noopener,noreferrer');
            if (!opened || opened.closed) {
              toast.info('Popup blocked. Use the Open Link button below.');
            }
          }, 800);
        }
        return;
      }
    } catch (err) {
      console.error('[ScanQR] Scan error:', err);
    }

    animFrameRef.current = requestAnimationFrame(scanFrame);
  }, []);

  const startCamera = useCallback(async (facing?: 'environment' | 'user') => {
    mountedRef.current = true;

    if (facing === undefined) facing = facingMode;

    setCameraState('loading');
    setDecodedText('');
    setDetectedType('Text');
    setCopied(false);
    setTorchOn(false);
    setTorchAvailable(false);
    scanLockRef.current = false;
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    isStreamingRef.current = false;

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraState('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 640 }, height: { ideal: 480 } },
      });

      if (!mountedRef.current) {
        stream.getTracks().forEach(t => t.stop());
        return;
      }

      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) {
        stream.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        setCameraState('unavailable');
        return;
      }

      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.() as { torch?: boolean } | undefined;
      if (capabilities?.torch) {
        setTorchAvailable(true);
      }

      video.onloadedmetadata = () => {};
      video.onerror = () => {
        if (mountedRef.current) stopCamera();
      };

      video.srcObject = stream;
      await video.play();

      if (!mountedRef.current) {
        stopCamera();
        return;
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        isStreamingRef.current = true;
        setCameraState('streaming');
        scanFrame();
      } else {
        stopCamera();
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraState('denied');
      } else {
        setCameraState('unavailable');
      }
    }
  }, [scanFrame, stopCamera, facingMode]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(decodedText);
    if (ok) {
      setCopied(true);
      toast.success('Copied successfully');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Unable to copy. Please copy manually.');
    }
  };

  const handleScanAgain = () => {
    redirectTimeoutRef.current && clearTimeout(redirectTimeoutRef.current);
    scanLockRef.current = false;
    setDecodedText('');
    setDetectedType('Text');
    setCopied(false);
    startCamera();
  };

  const handleClear = () => {
    redirectTimeoutRef.current && clearTimeout(redirectTimeoutRef.current);
    scanLockRef.current = false;
    setDecodedText('');
    setDetectedType('Text');
    setCopied(false);
    setCameraState('idle');
  };

  const handleSwitchCamera = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  };

  const handleTorch = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !torchOn } as any] });
      setTorchOn(!torchOn);
    } catch {
      toast.error('Torch not available on this device');
    }
  };

  const isCameraStopped = cameraState === 'idle' || cameraState === 'denied' || cameraState === 'unavailable' || cameraState === 'unsupported';

  const typeIconMap: Record<string, React.ReactNode> = {
    URL: <Globe className="h-5 w-5" />,
    WiFi: <Wifi className="h-5 w-5" />,
    Email: <Mail className="h-5 w-5" />,
    Text: <Smartphone className="h-5 w-5" />,
    Phone: <Smartphone className="h-5 w-5" />,
    SMS: <Smartphone className="h-5 w-5" />,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {cameraState === 'detected' ? (
          <div className="p-6 md:p-8 animate-fadeIn">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Scan Successful</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                  {typeIconMap[detectedType] || typeIconMap.Text}
                  {detectedType}
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                {isUrl ? (
                  <a href={decodedText} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2563EB] break-all font-mono hover:underline leading-relaxed">
                    {decodedText}
                  </a>
                ) : (
                  <p className="text-sm text-gray-900 break-all font-mono leading-relaxed">{decodedText}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleScanAgain} size="lg" className="gap-2 h-12 md:h-[52px] rounded-[14px] flex-1 min-w-[120px] shadow-lg shadow-primary/20">
                <RefreshCw className="h-5 w-5" />
                Scan Again
              </Button>
              <Button onClick={handleCopy} variant="outline" size="lg" className="gap-2 h-12 md:h-[52px] rounded-[14px] flex-1 min-w-[120px]">
                {copied ? (
                  <><Check className="h-5 w-5 text-green-500" /> Copied</>
                ) : (
                  <><Copy className="h-5 w-5" /> Copy</>
                )}
              </Button>
              {isUrl && (
                <Button variant="outline" size="lg" asChild className="gap-2 h-12 md:h-[52px] rounded-[14px] flex-1 min-w-[120px]">
                  <a href={decodedText} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5" />
                    Open Link
                  </a>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="relative bg-gray-950" style={{ aspectRatio: '640/400' }}>
              <video
                ref={videoRef}
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover ${cameraState !== 'streaming' ? 'opacity-0 pointer-events-none' : ''}`}
              />

              {cameraState === 'streaming' && (
                <div className="absolute inset-0">
                  <div className="absolute inset-x-0 top-0" style={{ height: 'calc(50% - 7rem)' }}>
                    <div className="w-full h-full bg-black/40" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0" style={{ height: 'calc(50% - 7rem)' }}>
                    <div className="w-full h-full bg-black/40" />
                  </div>
                  <div className="absolute top-1/2 left-0" style={{ transform: 'translateY(-50%)', width: 'calc(50% - 7rem)', height: '14rem' }}>
                    <div className="w-full h-full bg-black/40" />
                  </div>
                  <div className="absolute top-1/2 right-0" style={{ transform: 'translateY(-50%)', width: 'calc(50% - 7rem)', height: '14rem' }}>
                    <div className="w-full h-full bg-black/40" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/70" />
                    <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-[3px] border-l-[3px] border-[#2563EB] rounded-tl-lg" />
                    <div className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-[3px] border-r-[3px] border-[#2563EB] rounded-tr-lg" />
                    <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-[3px] border-l-[3px] border-[#2563EB] rounded-bl-lg" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-[3px] border-r-[3px] border-[#2563EB] rounded-br-lg" />
                    <div className="absolute left-2 right-2 h-px animate-scan-line bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 text-white/70 text-xs px-3 py-1.5 rounded-full">
                    <Scan className="h-3 w-3" />
                    Looking for QR Code...
                  </div>
                </div>
              )}

              {cameraState === 'loading' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-950">
                  <Loader2 className="h-8 w-8 text-[#2563EB] animate-spin" />
                  <p className="text-sm text-gray-300">Starting Camera...</p>
                </div>
              )}

              {cameraState === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-950 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-[#2563EB]" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-white">Ready to Scan</p>
                    <p className="text-sm text-gray-400 mt-1 max-w-xs">Allow camera access to start scanning QR codes instantly.</p>
                  </div>
                </div>
              )}

              {cameraState === 'denied' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-950 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
                    <CameraOff className="h-8 w-8 text-red-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-white">Camera Access Required</p>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm">Allow camera permission in your browser settings and try again.</p>
                  </div>
                </div>
              )}

              {cameraState === 'unavailable' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-950 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gray-700/50 flex items-center justify-center">
                    <CameraOff className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-white">Camera Unavailable</p>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm">No camera detected on this device.</p>
                  </div>
                </div>
              )}

              {cameraState === 'unsupported' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-950 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gray-700/50 flex items-center justify-center">
                    <CameraOff className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-white">Browser Not Supported</p>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm">Camera access is not available in this browser. Try Chrome, Firefox, Edge, or Safari.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              {isCameraStopped && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => startCamera()} size="lg" className="flex-1 gap-2 h-12 md:h-[52px] rounded-[14px] shadow-lg shadow-primary/20">
                    <Camera className="h-5 w-5" />
                    Start Camera
                  </Button>
                  {cameraState === 'denied' && (
                    <Button onClick={() => startCamera()} variant="outline" size="lg" className="flex-1 gap-2 h-12 md:h-[52px] rounded-[14px]">
                      <RefreshCw className="h-5 w-5" />
                      Try Again
                    </Button>
                  )}
                </div>
              )}

              {cameraState === 'streaming' && (
                <div className="flex flex-wrap gap-3">
                  <Button onClick={stopCamera} variant="outline" size="lg" className="gap-2 h-12 md:h-[52px] rounded-[14px] flex-1 min-w-[120px]">
                    <CameraOff className="h-5 w-5" />
                    Stop Camera
                  </Button>
                  {hasMultipleCameras && (
                    <Button onClick={handleSwitchCamera} variant="outline" size="lg" className="gap-2 h-12 md:h-[52px] rounded-[14px] flex-1 min-w-[120px]">
                      <SwitchCamera className="h-5 w-5" />
                      Switch Camera
                    </Button>
                  )}
                  {torchAvailable && (
                    <Button onClick={handleTorch} variant="outline" size="lg" className={`gap-2 h-12 md:h-[52px] rounded-[14px] flex-1 min-w-[120px] ${torchOn ? 'bg-[#2563EB]/5 border-[#2563EB]/30 text-[#2563EB]' : ''}`}>
                      <Sun className={`h-5 w-5 ${torchOn ? 'text-[#2563EB]' : ''}`} />
                      {torchOn ? 'Torch On' : 'Torch'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
