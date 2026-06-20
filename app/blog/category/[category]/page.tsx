import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { categories, getBlogPostsByCategory } from '@/lib/blog-data';
import { Section } from '@/components/shared/card';

interface PageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return { title: 'Not Found' };

  return {
    title: `${category.name} - ShareTextQR Blog`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export default function CategoryPage({ params }: PageProps) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const posts = getBlogPostsByCategory(params.category);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        </div>
      </section>

      {/* Posts */}
      <Section background="default">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
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
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No articles in this category yet.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
