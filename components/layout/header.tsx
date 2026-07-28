'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Check, ChevronDown, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tools } from '@/lib/tools-data';
import { Search } from '@/components/shared/search';

const navigation = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const stripItems = ['100% Free', 'No Login', 'Privacy First', 'Unlimited Usage'];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const qrTools = tools.filter((t) => t.category === 'qr' && t.name !== 'QR Code Generator');
  const imageTools = tools.filter((t) => t.category === 'image');
  const isQrActive = qrTools.some((t) => pathname === t.href);
  const isImageActive = imageTools.some((t) => pathname === t.href);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Strip */}
      <div className="bg-[#16A34A] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-8 gap-6">
            {stripItems.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                <Check className="h-3 w-3 text-white" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className={cn(
          'w-full transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white border-b border-gray-100/50'
        )}
      >
          <div className="flex items-center h-14 md:h-16 w-full pl-2 md:pl-0">
            {/* Logo - completely outside <nav> */}
            <Link href="/" className="flex items-center shrink-0 group -ml-8 md:translate-y-[4px]">
              <Image src="/logo.svg" alt="ShareTextQR" width={780} height={170} className="!w-[247px] sm:!w-[333px] !h-auto" priority />
            </Link>

            <nav className="flex items-center flex-1 h-full" aria-label="Main navigation">
              <div className="flex items-center justify-between flex-1 max-w-7xl mx-0 md:mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-2 md:pr-6 lg:pr-8">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-0.5">
                  {/* QR Tools Dropdown */}
                  <div className="relative group">
                    <button
                      aria-haspopup="true"
                      aria-expanded={false}
                      className={cn(
                        'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 inline-flex items-center gap-1',
                        isQrActive
                          ? 'text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      style={isQrActive ? { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' } : undefined}
                    >
                      QR Tools <ChevronDown className="h-3 w-3" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                      {qrTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          >
                            <Icon className="h-4 w-4 text-[#2563EB]" />
                            {tool.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Image Tools Dropdown */}
                  <div className="relative group">
                    <button
                      aria-haspopup="true"
                      aria-expanded={false}
                      className={cn(
                        'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 inline-flex items-center gap-1',
                        isImageActive
                          ? 'text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      style={isImageActive ? { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' } : undefined}
                    >
                      Image Tools <ChevronDown className="h-3 w-3" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1 group-hover:translate-y-0 transition-all duration-200 z-50">
                      {imageTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          >
                            <Icon className="h-4 w-4 text-[#16A34A]" />
                            {tool.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                          isActive
                            ? 'text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                        style={isActive ? { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' } : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Right: Search + Mobile toggles */}
                <div className="flex items-center gap-3 ml-auto">
                  <div className="hidden md:block w-56">
                    <Search />
                  </div>
                  <div className="flex md:hidden items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    aria-label="Toggle search"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            </nav>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden pb-3 px-4 sm:px-6 lg:px-8">
              <Search />
            </div>
          )}

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden border-t border-gray-100 pb-4 px-4 sm:px-6 lg:px-8">
              <div className="pt-3 space-y-1">
                {/* QR Tools (mobile accordion) */}
                <div>
                  <button
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === 'qr' ? null : 'qr')}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-xl transition-colors',
                      isQrActive
                        ? 'text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  style={isQrActive ? { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' } : undefined}
                  >
                    QR Tools
                    <ChevronDown className={cn('h-4 w-4 transition-transform', openMobileDropdown === 'qr' && 'rotate-180')} />
                  </button>
                  {openMobileDropdown === 'qr' && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {qrTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 text-[#2563EB]" />
                            {tool.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Image Tools (mobile accordion) */}
                <div>
                  <button
                    onClick={() => setOpenMobileDropdown(openMobileDropdown === 'image' ? null : 'image')}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-xl transition-colors',
                      isImageActive
                        ? 'text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  style={isImageActive ? { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' } : undefined}
                  >
                    Image Tools
                    <ChevronDown className={cn('h-4 w-4 transition-transform', openMobileDropdown === 'image' && 'rotate-180')} />
                  </button>
                  {openMobileDropdown === 'image' && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {imageTools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Icon className="h-4 w-4 text-[#16A34A]" />
                            {tool.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-xl transition-colors',
                        isActive
                          ? 'text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                      style={isActive ? { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' } : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
      </div>
    </header>
  );
}
