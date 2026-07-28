import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Instagram, Youtube, Facebook } from 'lucide-react';

const footerNavigation = {
  popularTools: [
    { name: 'Text to QR', href: '/text-to-qr' },
    { name: 'Scan QR with Webcam', href: '/scan-qr' },
    { name: 'Image to Text', href: '/image-to-text' },
    { name: 'Remove Background', href: '/remove-background' },
    { name: 'PNG to SVG', href: '/png-to-svg' },
    { name: 'Passport Photo Maker', href: '/passport-photo-maker' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center mb-1 group -ml-8">
                <Image src="/logo.svg" alt="ShareTextQR" width={780} height={170} className="!w-[247px] sm:!w-[333px] !h-auto" priority />
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed -mt-10 mb-6">
                Free online QR code generator and image tools. Convert text to QR, scan QR codes, convert images, and more.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://x.com/sharetextqr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#2563EB] hover:text-white transition-all duration-200" aria-label="X (Twitter)">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/sharetextqr?igsh=d3ZpbGk1MDY0dTFn" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#2563EB] hover:text-white transition-all duration-200" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://youtube.com/@sharetextqr?si=IsjxXb9I2lFVmr4v" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#2563EB] hover:text-white transition-all duration-200" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61591111533282" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#2563EB] hover:text-white transition-all duration-200" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://github.com/sharetextqr2/Sharetext2" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#2563EB] hover:text-white transition-all duration-200" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Popular Tools */}
            <div>
              <h3 className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-4">Popular Tools</h3>
              <ul className="space-y-2.5">
                {footerNavigation.popularTools.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2.5">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2.5 mb-7">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
              <h3 className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2.5">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ShareTextQR. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built by <a href="https://dev.to/javed_akib" target="_blank" rel="noopener noreferrer" className="underline">Akib Javed</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
