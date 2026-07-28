export interface PassportSize {
  label: string;
  widthMm: number;
  heightMm: number;
}

export interface CountryConfig {
  country: string;
  sizes: PassportSize[];
}

export interface PrintOptions {
  countryIndex: number;
  sizeIndex: number;
  copyCount: number;
  showCutGuides: boolean;
}

export interface GridLayout {
  cols: number;
  rows: number;
  total: number;
  photoWpx: number;
  photoHpx: number;
  marginPx: number;
  spacingPx: number;
  startX: number;
  startY: number;
  pageWpx: number;
  pageHpx: number;
}

export interface PhotoPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}
