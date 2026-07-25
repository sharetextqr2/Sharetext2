import { seo } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { getBlogPost, blogPosts, categories, type BlogPost } from '@/lib/blog-data';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { AdContainer } from '@/components/shared/ad-container';
import { PageContainer } from '@/components/shared/page-container';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';

interface PageProps {
  params: { slug: string };
}

const categoryTools: Record<string, string[]> = {
  'qr-code-guides': ['/text-to-qr', '/scan-qr'],
  'device-tips': ['/scan-qr', '/image-resizer', '/heic-to-jpg'],
  'productivity': ['/text-to-qr', '/image-compressor', '/image-resizer'],
  'technology': ['/image-to-text', '/svg-viewer', '/png-to-svg'],
  'education': ['/text-to-qr', '/scan-qr', '/image-to-text'],
  'communication': ['/text-to-qr', '/scan-qr'],
  'remote-work': ['/text-to-qr', '/image-compressor', '/image-resizer'],
};

export async function generateMetadata({ params }: PageProps): Promise<import('next').Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Not Found' };

  return seo({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    authors: [post.author],
  });
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const category = categories.find((c) => c.slug === post.category);
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);
  const toolHrefs = categoryTools[post.category] || ['/text-to-qr', '/scan-qr'];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sharetextqr.com' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sharetextqr.com/blog' },
              ...(category ? [{ '@type': 'ListItem', position: 3, name: category.name, item: `https://sharetextqr.com/blog/category/${category.slug}` }] : []),
              { '@type': 'ListItem', position: category ? 4 : 3, name: post.title, item: `https://sharetextqr.com/blog/${post.slug}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@type': 'Organization', name: 'ShareTextQR', url: 'https://sharetextqr.com' },
          }),
        }}
      />

      <div className="pt-20 md:pt-24">
        <PageContainer>
          <Breadcrumb items={[
            { label: 'Blog', href: '/blog' },
            ...(category ? [{ label: category.name, href: `/blog/category/${category.slug}` }] : []),
            { label: post.title },
          ]} />
        </PageContainer>
      </div>

      <article>
        <PageContainer className="pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-primary mb-4">
              <Tag className="h-4 w-4" />
              <Link href={`/blog/category/${post.category}`} className="hover:underline capitalize">
                {category?.name || post.category.replace('-', ' ')}
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-10">
              <div
                className="prose prose-gray prose-lg max-w-none
                  prose-headings:font-semibold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-600
                  prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-table:border-collapse prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50
                  prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\n/g, '<br/>')
                    .replace(/## /g, '<h2>')
                    .replace(/### /g, '<h3>')
                    .replace(/- /g, '<li>'),
                }}
              />
            </div>
          </div>
        </PageContainer>
      </article>

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        <RelatedTools currentToolHref="" relatedHrefs={toolHrefs} />
      </PageContainer>

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      {relatedPosts.length > 0 && (
        <PageContainer className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </PageContainer>
      )}

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>
    </>
  );
}
