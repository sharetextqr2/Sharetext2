'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

interface FileValidation {
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

interface ImageUploadProps {
  onFile: (file: File) => void;
  validation?: FileValidation;
  label?: string;
}

export function ImageUpload({ onFile, validation, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const validate = useCallback(
    (file: File): string | null => {
      if (validation?.maxSizeMB && file.size > validation.maxSizeMB * 1024 * 1024) {
        return `File size exceeds ${validation.maxSizeMB} MB limit.`;
      }
      if (validation?.acceptedTypes && validation.acceptedTypes.length > 0) {
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        const mimeOk = validation.acceptedTypes.some((t) => file.type.startsWith(t) || t === ext);
        if (!mimeOk) {
          const exts = validation.acceptedTypes.filter((t) => t.startsWith('.')).join(', ');
          return `Unsupported file type. Accepted: ${exts || validation.acceptedTypes.join(', ')}`;
        }
      }
      return null;
    },
    [validation]
  );

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const err = validate(file);
      if (err) {
        setError(err);
        setPreview(null);
        return;
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      onFile(file);
    },
    [validate, onFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleReset = () => {
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={label || 'Upload image'}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 min-h-[220px] ${
          dragOver
            ? 'border-primary bg-primary/5'
            : preview
              ? 'border-gray-200 bg-gray-50/50'
              : error
                ? 'border-red-200 bg-red-50/50'
                : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/50 hover:border-gray-300'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={validation?.acceptedTypes?.join(',')}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Upload preview"
              loading="lazy"
              className="max-h-48 max-w-full rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              aria-label="Remove file"
              className="absolute top-3 right-3 p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
              {error ? (
                <AlertCircle className="h-7 w-7 text-red-500" />
              ) : (
                <Upload className="h-7 w-7 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {error || (label || 'Drop an image here or click to browse')}
              </p>
              {!error && (
                <p className="text-xs text-gray-500 mt-1.5">
                  {validation?.acceptedTypes
                    ? validation.acceptedTypes.filter((t) => t.startsWith('.')).join(', ').toUpperCase()
                    : 'Images'}{' '}
                  {validation?.maxSizeMB ? `· Max ${validation.maxSizeMB} MB` : ''}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
