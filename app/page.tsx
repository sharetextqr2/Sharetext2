import { seo, SITE_NAME, BASE_URL } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, Check, Shield, Zap, Smartphone, Lock, QrCode, Image } from 'lucide-react';
import { tools } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';
import { PageContainer } from '@/components/shared/page-container';
import TextToQR from '@/components/tools/text-to-qr';

export const metadata = seo({
  title: 'Share Text Online Instantly for Free | ShareTextQR',
  description: 'Share text online instantly for free. Generate QR codes for text, notes, URLs, code snippets and messages securely. No login required.',
  path: '/',
  keywords: [
    'share text online',
    'text to qr',
    'online qr code generator',
    'share text instantly',
    'share text with qr code',
    'free online tools',
  ],
});

const latestPosts = blogPosts.slice(0, 4);

const trustSignals = [
  { icon: Check, title: '100% Free', description: 'All tools are completely free. No hidden fees, no subscriptions, no credit card required.' },
  { icon: Shield, title: 'No Login Required', description: 'Start using any tool instantly. No account creation, no signup, no personal information needed.' },
  { icon: Lock, title: 'Privacy First', description: 'Your data stays private. Files are processed securely and not stored longer than necessary.' },
  { icon: Smartphone, title: 'Works on Mobile & Desktop', description: 'All tools are fully responsive and work seamlessly on any device, any screen size.' },
  { icon: Zap, title: 'Fast Processing', description: 'Everything happens in real-time. Upload, convert, generate — results in seconds.' },
];

const toolCategoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  qr: QrCode,
  image: Image,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: SITE_NAME,
            url: BASE_URL,
            description: 'Share text online instantly for free. Generate QR codes for text, notes, URLs, code snippets and messages securely.',
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
            name: SITE_NAME,
            url: BASE_URL,
            logo: `${BASE_URL}/logo.svg`,
          }),
        }}
      />

      {/* HERO */}
      <section className="pt-28 md:pt-36 pb-2 md:pb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold mb-5">
              <Check className="h-3 w-3" />
              100% Free &middot; No Login &middot; Unlimited
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-2 text-balance">
              Share <span className="text-[#2563EB]">Text</span> <span className="text-[#16A34A]">Online</span> Instantly for Free
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Share text online instantly for free. Generate QR codes for text, notes, URLs, code snippets and messages securely. No login required.
            </p>
          </div>
        </div>
      </section>

      {/* TEXT TO QR GENERATOR */}
      <section className="pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <TextToQR />
          </div>
        </div>
      </section>

      {/* ALL TOOLS */}
      <section className="py-14 md:py-18 bg-gray-50/50 border-t border-gray-100">
        <PageContainer>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-3">All Tools</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every tool you need to generate QR codes, convert images, and more. All free, all online.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {tools.filter((t) => t.name !== 'QR Code Generator').map((tool) => {
              const Icon = tool.icon;
              const CategoryIcon = toolCategoryIcons[tool.category] || QrCode;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white rounded-2xl border border-gray-200 p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#2563EB]/30"
                >
                  <div className={`w-12 h-12 rounded-xl ${tool.category === 'qr' ? 'bg-[#DBEAFE]' : 'bg-[#DCFCE7]'} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-6 w-6 ${tool.category === 'qr' ? 'text-[#2563EB]' : 'text-[#16A34A]'}`} />
                  </div>
                  <p className={`text-base font-semibold text-gray-900 ${tool.category === 'qr' ? 'group-hover:text-[#2563EB]' : 'group-hover:text-[#16A34A]'} transition-colors`}>{tool.name}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* WHY CHOOSE SHARETEXTQR */}
      <section className="py-14 md:py-18">
        <PageContainer>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-3">Why Choose ShareTextQR</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A premium utility platform designed for speed, privacy, and simplicity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trustSignals.map((signal) => {
              const SignalIcon = signal.icon;
              return (
                <div key={signal.title} className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center mb-4">
                    <SignalIcon className="h-5 w-5 text-[#2563EB]" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{signal.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{signal.description}</p>
                </div>
              );
            })}
          </div>
        </PageContainer>
      </section>

      {/* LATEST ARTICLES */}
      <section className="py-14 md:py-18 bg-gray-50/50 border-t border-gray-100">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Latest Articles</h2>
              <p className="text-gray-500 mt-1">Guides and tips for getting the most out of ShareTextQR.</p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors shrink-0"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-[#2563EB]/30"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-2.5 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                  <span>{post.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
