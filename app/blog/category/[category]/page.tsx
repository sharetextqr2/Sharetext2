import { seo } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts, categories } from '@/lib/blog-data';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { AdContainer } from '@/components/shared/ad-container';
import { PageContainer } from '@/components/shared/page-container';
import { ArticleCard } from '@/components/shared/article-card';

interface PageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: PageProps): Promise<import('next').Metadata> {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return { title: 'Not Found' };

  return seo({
    title: `${category.name} Articles`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
  });
}

export async function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default function BlogCategoryPage({ params }: PageProps) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const posts = blogPosts.filter((p) => p.category === category.slug);

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
              { '@type': 'ListItem', position: 3, name: category.name, item: `https://sharetextqr.com/blog/category/${category.slug}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${category.name} Articles`,
            description: category.description,
            url: `https://sharetextqr.com/blog/category/${category.slug}`,
            hasPart: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: `https://sharetextqr.com/blog/${post.slug}`,
              datePublished: post.publishedAt,
            })),
          }),
        }}
      />

      <div className="pt-20 md:pt-24">
        <PageContainer>
          <Breadcrumb items={[
            { label: 'Blog', href: '/blog' },
            { label: category.name },
          ]} />
        </PageContainer>
      </div>

      <PageContainer className="pb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {category.description}
          </p>
        </div>
      </PageContainer>

      {posts.length > 0 ? (
        <div className="bg-white border-t border-gray-100">
          <PageContainer className="py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </PageContainer>
        </div>
      ) : (
        <PageContainer className="py-12">
          <div className="text-center">
            <p className="text-gray-500">No articles found in this category.</p>
          </div>
        </PageContainer>
      )}

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((cat) => {
              const postCount = blogPosts.filter((p) => p.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {postCount} article{postCount !== 1 ? 's' : ''}
                  </p>
                </Link>
              );
            })}
        </div>
      </PageContainer>
    </>
  );
}
