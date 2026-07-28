export interface SizeOption {
  label: string;
  width: number;
  height: number;
  isCustom?: boolean;
}

export const SIZE_OPTIONS: SizeOption[] = [
  { label: '🇮🇳 Indian Passport (3.5 × 4.5 cm)', width: 413, height: 531 },
  { label: '🇺🇸 USA Passport (2 × 2 inch)', width: 600, height: 600 },
  { label: '🇬🇧 UK Passport (35 × 45 mm)', width: 413, height: 531 },
  { label: '🇨🇦 Canada Passport (50 × 70 mm)', width: 591, height: 827 },
  { label: '🇦🇺 Australia Passport (35 × 45 mm)', width: 413, height: 531 },
  { label: '🇯🇵 Japan Passport (35 × 45 mm)', width: 413, height: 531 },
  { label: '🇨🇳 China Passport (33 × 48 mm)', width: 390, height: 567 },
  { label: '🇪🇺 EU Standard (35 × 45 mm)', width: 413, height: 531 },
  { label: '🌍 Select Custom Size...', width: 0, height: 0, isCustom: true },
];

export const COPY_COUNTS = [1, 2, 4, 6, 8, 10, 12, 16];

export function mmToPx(mm: number): number {
  return Math.round((mm / 25.4) * 300);
}

export function pxToMm(px: number): number {
  return (px / 300) * 25.4;
}
