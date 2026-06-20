import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts, categories, getFeaturedPosts } from '@/lib/blog-data';
import { Section } from '@/components/shared/card';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Discover guides, tips, and insights about QR codes, text sharing, productivity, and more. Learn how to make the most of ShareTextQR.',
  openGraph: {
    title: 'ShareTextQR Blog - Guides, Tips, and Insights',
    description:
      'Discover guides, tips, and insights about QR codes, text sharing, productivity, and more.',
  },
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      {/* Structured Data */}
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

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-4">
            Blog & Resources
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Guides, Tips & Insights
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Learn how to make the most of QR codes for text sharing, boost your productivity,
            and stay updated on the latest features.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Section background="default">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <Tag className="h-3 w-3" />
                    <span className="capitalize">{post.category.replace('-', ' ')}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
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
        </Section>
      )}

      {/* Categories */}
      <Section background="muted">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const postCount = blogPosts.filter((p) => p.category === category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="group p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {postCount} article{postCount !== 1 ? 's' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* All Posts */}
      <Section background="default">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Articles</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 mb-2">
                <span className="capitalize">{post.category.replace('-', ' ')}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {post.author}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
