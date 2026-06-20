import { Metadata } from 'next';
import Link from 'next/link';
import { categories, blogPosts } from '@/lib/blog-data';
import { Section } from '@/components/shared/card';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Navigate all pages on ShareTextQR. Find guides, articles, and information about text QR sharing.',
};

const mainPages = [
  { name: 'Home', href: '/', description: 'Generate QR codes from text instantly' },
  { name: 'About', href: '/about', description: 'Learn about ShareTextQR mission' },
  { name: 'Blog', href: '/blog', description: 'Guides, tips, and insights' },
  { name: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
  { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
  { name: 'Text to QR Code', href: '/text-to-qr-code', description: 'Convert text into QR codes instantly' },
  { name: 'Free QR Code Generator', href: '/free-qr-code-generator', description: 'Generate QR codes for text completely free' },
  { name: 'Share Text Online', href: '/share-text-online', description: 'Share text online instantly using QR codes' },
  { name: 'QR Code for Text', href: '/qr-code-for-text', description: 'Create QR codes for text messages and notes' },
  { name: 'Transfer Text Between Devices', href: '/transfer-text-between-devices', description: 'Transfer text between phones, tablets, and computers' },
];

const legalPages = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export default function SitemapPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Sitemap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find all pages on ShareTextQR
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            For search engines, use the XML sitemap at <a href="/sitemap.xml" className="text-indigo-600 dark:text-indigo-400 hover:underline">/sitemap.xml</a>.
          </p>
        </div>
      </section>

      <Section background="default">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Main Pages
            </h2>
            <ul className="space-y-3">
              {mainPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="block p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {page.name}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {page.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Categories */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Blog Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="block p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {cat.name}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {cat.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Articles */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Blog Articles
            </h2>
            <ul className="space-y-2">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {post.title}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {post.readTime}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h2>
            <div className="flex flex-wrap gap-4">
              {legalPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="px-4 py-2 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700/50 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
