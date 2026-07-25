import {
  QrCode, Scan, Image, FileImage, Eye, FileText, Crop,
  Minimize2, Maximize2, FileUp, FileDown
} from 'lucide-react';

export interface Tool {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: 'qr' | 'image';
}

export const tools: Tool[] = [
  { name: 'Text to QR', href: '/text-to-qr', icon: QrCode, description: 'Convert text to QR code instantly', category: 'qr' },
  { name: 'Scan QR', href: '/scan-qr', icon: Scan, description: 'Scan QR codes with your camera', category: 'qr' },
  { name: 'PNG to SVG', href: '/png-to-svg', icon: Image, description: 'Convert PNG images to SVG', category: 'image' },
  { name: 'SVG to PNG', href: '/svg-to-png', icon: FileImage, description: 'Convert SVG to PNG format', category: 'image' },
  { name: 'SVG Viewer', href: '/svg-viewer', icon: Eye, description: 'View and inspect SVG files', category: 'image' },
  { name: 'Image to Text', href: '/image-to-text', icon: FileText, description: 'Extract text from images', category: 'image' },
  { name: 'Remove Background', href: '/remove-background', icon: Crop, description: 'Remove image background', category: 'image' },
  { name: 'Image Compressor', href: '/image-compressor', icon: Minimize2, description: 'Compress image file size', category: 'image' },
  { name: 'Image Resizer', href: '/image-resizer', icon: Maximize2, description: 'Resize images to any dimension', category: 'image' },
  { name: 'HEIC to JPG', href: '/heic-to-jpg', icon: FileUp, description: 'Convert HEIC to JPG format', category: 'image' },
  { name: 'Passport Photo Maker', href: '/passport-photo-maker', icon: FileDown, description: 'Create passport photos', category: 'image' },
];
