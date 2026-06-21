import React from 'react';
import Link from 'next/link';
import { QrCode, X, Facebook, Instagram, Youtube } from 'lucide-react';

function RedditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21c4.97 0 9-3.582 9-8s-4.03-8-9-8-9 3.582-9 8 4.03 8 9 8Z" />
      <path d="M7 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-8.5 3.25c1.167.833 2.581 1.25 4.5 1.25s3.333-.417 4.5-1.25" />
      <path d="M15.5 9A1.5 1.5 0 1 0 14 6.5 1.5 1.5 0 0 0 15.5 9Z" />
      <path d="M15.5 9 17.5 7.5" />
      <path d="M15.5 9 17.5 10.5" />
      <path d="M9.5 8.5 12 5" />
    </svg>
  );
}

const footerNavigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap' },
  ],
  resources: [
    { name: 'Text to QR Code', href: '/text-to-qr-code' },
    { name: 'Free QR Code Generator', href: '/free-qr-code-generator' },
    { name: 'Share Text Online', href: '/share-text-online' },
    { name: 'QR Code for Text', href: '/qr-code-for-text' },
    { name: 'Transfer Text Between Devices', href: '/transfer-text-between-devices' },
    { name: 'QR Code Guides', href: '/blog/category/qr-code-guides' },
    { name: 'Productivity Tips', href: '/blog/category/productivity' },
    { name: 'Device Tips', href: '/blog/category/device-tips' },
  ],
};

const socialLinks = [
  { name: 'X', href: 'https://x.com/sharetextqr', icon: X },
  { name: 'Reddit', href: 'https://www.reddit.com/u/sharetextqr/s/45Z7O0HIWo', icon: RedditIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/sharetextqr?igsh=d3ZpbGk1MDY0dTFn', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@sharetextqr?si=IsjxXb9I2lFVmr4v', icon: Youtube },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591111533282', icon: Facebook },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 group mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25">
                  <QrCode className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-gray-900 dark:text-white">Share</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    TextQR
                  </span>
                </span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
                Share unlimited text across any device instantly with QR codes.
                No signups, no downloads, just simple and fast text sharing.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerNavigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} ShareTextQR. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
