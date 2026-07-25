import { seo } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';
import { Search } from '@/components/shared/search';
import { AdContainer } from '@/components/shared/ad-container';
import { SectionTitle } from '@/components/shared/section-title';
import { PageContainer } from '@/components/shared/page-container';
import { SectionSpacing } from '@/components/shared/section-spacing';
import { ToolCard } from '@/components/shared/tool-card';
import { ArticleCard } from '@/components/shared/article-card';

export const metadata = seo({
  title: 'ShareTextQR - Free Online QR Code & Image Tools',
  description:
    'Free online QR code generator and image tools. Convert text to QR codes, scan QR codes with webcam, convert PNG to SVG, compress images, resize photos, and more. No signup required.',
  path: '/',
});

const qrTools = tools.filter((t) => t.category === 'qr');
const imageTools = tools.filter((t) => t.category === 'image');

export default function Home() {
  const latestPosts = blogPosts.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'ShareTextQR',
            url: 'https://sharetextqr.com',
            description:
              'Free online QR code generator and image tools. Convert text to QR codes, scan QR codes, convert images, compress, resize, and more.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ShareTextQR',
            url: 'https://sharetextqr.com',
            logo: 'https://sharetextqr.com/favicon.svg',
          }),
        }}
      />

      {/* Search Section - above the fold */}
      <SectionSpacing className="bg-white" size="lg">
        <PageContainer className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Free Online QR Code &amp; Image Tools
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate QR codes, scan with camera, convert images, compress, resize, and more. All tools are free, no signup required.
          </p>
          <div className="max-w-xl mx-auto" role="search">
            <Search />
          </div>
        </PageContainer>
      </SectionSpacing>

      {/* Popular Tools */}
      <SectionSpacing id="generator" className="bg-gray-50" size="lg">
        <PageContainer>
          <SectionTitle title="Popular Tools" align="left" className="mb-8" />

          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">QR Tools</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
            {qrTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="grid" />
            ))}
          </div>

          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">Image Tools</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {imageTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="grid" />
            ))}
          </div>
        </PageContainer>
      </SectionSpacing>

      {/* Ad 1 */}
      <SectionSpacing className="bg-white" size="sm">
        <PageContainer>
          <AdContainer />
        </PageContainer>
      </SectionSpacing>

      {/* Latest Tools */}
      <SectionSpacing className="bg-gray-50" size="lg">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <SectionTitle title="Latest Tools" align="left" />
            <Link
              href="/text-to-qr"
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 shrink-0"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="list" />
            ))}
          </div>
        </PageContainer>
      </SectionSpacing>

      {/* Ad 2 */}
      <SectionSpacing className="bg-white" size="sm">
        <PageContainer>
          <AdContainer />
        </PageContainer>
      </SectionSpacing>

      {/* Latest Articles */}
      <SectionSpacing className="bg-gray-50" size="lg">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <SectionTitle title="Latest Articles" align="left" />
            <Link
              href="/blog"
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 shrink-0"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </PageContainer>
      </SectionSpacing>

      {/* Ad 3 */}
      <SectionSpacing className="bg-white" size="sm">
        <PageContainer>
          <AdContainer />
        </PageContainer>
      </SectionSpacing>
    </>
  );
}
