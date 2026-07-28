import { NextResponse } from 'next/server';
import { blogPosts, categories } from '@/lib/blog-data';
import { tools } from '@/lib/tools-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://sharetextqr.com';

const staticRoutes = [
  '/',
  '/about',
  '/blog',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
  '/sitemap',
];

const toolRoutes = tools.map((t) => t.href);

const formatDate = (value: string) => {
  try {
    return new Date(value).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
};

const createUrlEntry = ({ loc, lastmod, changefreq = 'weekly', priority = '0.80' }: {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}) => {
  return [`  <url>`, `    <loc>${BASE_URL}${loc}</loc>`, lastmod ? `    <lastmod>${lastmod}</lastmod>` : null, `    <changefreq>${changefreq}</changefreq>`, `    <priority>${priority}</priority>`, `  </url>`]
    .filter(Boolean)
    .join('\n');
};

export async function GET() {
  const today = formatDate(new Date().toISOString());

  const urls = [
    ...staticRoutes.map((route) =>
      createUrlEntry({
        loc: route,
        lastmod: today,
        changefreq: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? '1.00' : '0.80',
      }),
    ),
    ...toolRoutes.map((route) =>
      createUrlEntry({
        loc: route,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.90',
      }),
    ),
    ...categories.map((category) =>
      createUrlEntry({
        loc: `/blog/category/${category.slug}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.70',
      }),
    ),
    ...blogPosts.map((post) =>
      createUrlEntry({
        loc: `/blog/${post.slug}`,
        lastmod: formatDate(post.publishedAt),
        changefreq: 'monthly',
        priority: '0.65',
      }),
    ),
  ]
    .filter(Boolean)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}
