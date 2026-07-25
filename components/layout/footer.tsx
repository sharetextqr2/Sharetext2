import React from 'react';
import Link from 'next/link';
import { QrCode } from 'lucide-react';

const footerNavigation = {
  qrTools: [
    { name: 'Text to QR', href: '/text-to-qr' },
    { name: 'Scan QR', href: '/scan-qr' },
  ],
  imageTools: [
    { name: 'PNG to SVG', href: '/png-to-svg' },
    { name: 'SVG to PNG', href: '/svg-to-png' },
    { name: 'SVG Viewer', href: '/svg-viewer' },
    { name: 'Image to Text', href: '/image-to-text' },
    { name: 'Remove Background', href: '/remove-background' },
    { name: 'Image Compressor', href: '/image-compressor' },
    { name: 'Image Resizer', href: '/image-resizer' },
    { name: 'HEIC to JPG', href: '/heic-to-jpg' },
    { name: 'Passport Photo Maker', href: '/passport-photo-maker' },
  ],
  blog: [
    { name: 'Blog Home', href: '/blog' },
    { name: 'QR Code Guides', href: '/blog/category/qr-code-guides' },
    { name: 'Productivity', href: '/blog/category/productivity' },
    { name: 'Device Tips', href: '/blog/category/device-tips' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-primary shadow-sm">
                  <QrCode className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-gray-900">Share</span>
                  <span className="text-primary">TextQR</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Free online QR code generator and image tools. Convert text to QR, scan QR codes, convert images, compress, resize, and more.
              </p>
            </div>

            {/* QR Tools */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">QR Tools</h3>
              <ul className="space-y-3">
                {footerNavigation.qrTools.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-primary transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Image Tools</h3>
              <ul className="space-y-3">
                {footerNavigation.imageTools.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-primary transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog & Company */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Blog</h3>
              <ul className="space-y-3 mb-8">
                {footerNavigation.blog.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-primary transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-primary transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ShareTextQR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
