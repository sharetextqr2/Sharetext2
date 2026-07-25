import { seo } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts, categories, getFeaturedPosts } from '@/lib/blog-data';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { AdContainer } from '@/components/shared/ad-container';
import { PageContainer } from '@/components/shared/page-container';

export const metadata = seo({
  title: 'Blog',
  description: 'Discover guides, tips, and insights about QR codes, text sharing, productivity, and more. Learn how to make the most of ShareTextQR.',
  path: '/blog',
});

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'ShareTextQR Blog',
            description: 'Guides, tips, and insights about QR codes and text sharing.',
            url: 'https://sharetextqr.com/blog',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sharetextqr.com' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://sharetextqr.com/blog' },
            ],
          }),
        }}
      />

      <div className="pt-20 md:pt-24">
        <PageContainer>
          <Breadcrumb items={[{ label: 'Blog' }]} />
        </PageContainer>
      </div>

      <PageContainer className="pb-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Guides, Tips & Insights
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how to make the most of QR codes for text sharing, boost your productivity,
            and stay updated on the latest features.
          </p>
        </div>
      </PageContainer>

      {featuredPosts.length > 0 && (
        <div className="bg-white border-t border-gray-100">
          <PageContainer className="py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Tag className="h-3 w-3" />
                      <span className="capitalize">{post.category.replace('-', ' ')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </PageContainer>
        </div>
      )}

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const postCount = blogPosts.filter((p) => p.category === category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {postCount} article{postCount !== 1 ? 's' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </PageContainer>

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-primary mb-2">
                <span className="capitalize">{post.category.replace('-', ' ')}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {post.author}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
