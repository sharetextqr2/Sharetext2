import type { Metadata } from 'next';

const SITE_NAME = 'ShareTextQR';
export const BASE_URL = 'https://sharetextqr.com';
const DEFAULT_OG_IMAGE = '/og-image.svg';
const TWITTER_HANDLE = '@sharetextqr';

interface SeoParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  authors?: string[];
}

export function seo(params: SeoParams): Metadata {
  const fullUrl = `${BASE_URL}${params.path}`;
  const ogImage = params.ogImage || DEFAULT_OG_IMAGE;

  return {
    title: params.title,
    description: params.description,
    keywords: params.keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: params.title,
      description: params.description,
      url: fullUrl,
      siteName: SITE_NAME,
      type: params.ogType || 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: params.title,
        },
      ],
      ...(params.publishedTime && { publishedTime: params.publishedTime }),
      ...(params.authors && { authors: params.authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: [ogImage],
      creator: TWITTER_HANDLE,
    },
    ...(params.noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
