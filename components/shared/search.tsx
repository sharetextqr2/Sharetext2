'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tools } from '@/lib/tools-data';

export function Search({ className }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      )
    : tools;

  const handleSelect = useCallback(() => {
    setQuery('');
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      window.location.href = results[focusedIndex].href;
      handleSelect();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={cn('relative', className)} role="combobox" aria-expanded={isOpen} aria-haspopup="listbox" aria-controls="search-results">
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          placeholder="Search tools..."
          aria-label="Search tools"
          aria-autocomplete="list"
          aria-activedescendant={focusedIndex >= 0 ? `search-result-${focusedIndex}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1.5 left-0 right-0 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden z-50 animate-fade-in"
        >
          {results.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500" role="status" aria-live="polite">
              No tools found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul id="search-results" className="py-1 max-h-72 overflow-y-auto" role="listbox">
              {results.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <li key={tool.href} id={`search-result-${index}`} role="option" aria-selected={index === focusedIndex}>
                    <Link
                      href={tool.href}
                      onClick={handleSelect}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors',
                        index === focusedIndex
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-gray-400" />
                      <div className="min-w-0">
                        <span className="font-medium block truncate">{tool.name}</span>
                        <span className="text-xs text-gray-500 block truncate">{tool.description}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
