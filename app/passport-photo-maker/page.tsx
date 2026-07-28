import React from 'react';
import { seo, BASE_URL } from '@/lib/seo';
import { ToolLayout } from '@/components/shared/tool-layout';
import { ToolFAQ } from '@/components/shared/tool-faq';
import { RelatedTools } from '@/components/shared/related-tools';
import { ArticleCard } from '@/components/shared/article-card';
import { blogPosts } from '@/lib/blog-data';
import { SectionTitle } from '@/components/shared/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Crop, LayoutGrid, Download } from 'lucide-react';
import PassportPhotoMaker from '@/components/tools/passport-photo-maker';

const faqItems = [
  { question: 'How does the Print on A4 feature work?', answer: 'After generating a passport photo, expand the Print on A4 section. Select your country, passport size, and how many copies you want. The tool automatically arranges the photos on an A4 page with equal spacing. You can then download as PNG, PDF, or print directly.' },
  { question: 'What passport sizes are available for A4 printing?', answer: 'We support India (35×45 mm), USA (2×2 in), UK (35×45 mm), Canada (50×70 mm), Australia (35×45 mm), Japan (45×35 mm), China (33×48 mm), and EU (35×45 mm). More countries can be added easily.' },
  { question: 'How many photos fit on one A4 page?', answer: 'Up to 20 photos depending on the passport size. You can choose 2, 4, 6, 8, 10, 12, 16, or 20 copies. The tool automatically calculates the best grid layout to maximise paper usage.' },
  { question: 'What is the output resolution?', answer: 'The A4 layout is rendered at 300 DPI for print-quality output. PNG and PDF downloads maintain the full resolution.' },
  { question: 'What are cut guides?', answer: 'Cut guides are light grey dashed lines drawn around each photo to help you cut them accurately after printing. You can enable or disable them with a checkbox.' },
  { question: 'How is the photo cropped?', answer: 'The tool automatically centres your face in the frame using the selected passport size. Make sure your face is clearly visible and centred in the original photo.' },
  { question: 'What image formats are supported?', answer: 'PNG, JPG, JPEG, and WebP formats are supported.' },
  { question: 'Is there a file size limit?', answer: 'Files up to 20 MB are supported.' },
];

const relatedHrefs = ['/image-resizer', '/remove-background', '/image-compressor', '/svg-to-png'];

const homepageArticles = blogPosts.filter((p) => p.featured).slice(0, 6);

export const metadata = seo({
  title: 'Passport Photo Maker – Print Passport Photos on A4 Online Free | ShareTextQR',
  description: 'Create passport photos and print them on A4 paper. Supports India, USA, UK, Canada, Australia, Japan, China, EU sizes. Download PNG, PDF or print directly from your browser.',
  path: '/passport-photo-maker',
  keywords: ['passport photo maker', 'passport photo print', 'passport photo on A4', 'passport photo template', 'free passport photo maker', 'passport photo print online', 'print passport photos', 'A4 passport photo layout'],
});

const steps = [
  { icon: Upload, title: 'Upload Photo', description: 'Choose a photo from your device. PNG, JPG, JPEG, and WebP are supported.' },
  { icon: Crop, title: 'Select Passport Size', description: 'Pick your country and passport size from the dropdown. The tool automatically crops and centres your photo.' },
  { icon: LayoutGrid, title: 'Arrange on A4', description: 'Expand the Print on A4 section. Choose how many copies, background colour, and enable cut guides. The grid layout updates instantly.' },
  { icon: Download, title: 'Download or Print', description: 'Download as PNG or PDF at 300 DPI, or print directly from your browser. Perfect for home or studio printing.' },
];

export default function PassportPhotoMakerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'ShareTextQR Passport Photo Maker', applicationCategory: 'MultimediaApplication', operatingSystem: 'Web', description: 'Create and print passport photos on A4 paper. Supports multiple countries and print-ready output.', url: `${BASE_URL}/passport-photo-maker` }) }} />
      <ToolLayout
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Image Tools', href: '/' }, { label: 'Passport Photo Maker' }]}
        header={<div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">Passport Photo Maker — Print on A4</h1><p className="mt-3 text-lg text-gray-600 max-w-3xl">Create standard passport photos and arrange multiple copies on an A4 page for printing. Supports India, USA, UK, Canada, Australia, Japan, China, and EU sizes with print-ready output at 300 DPI.</p></div>}
        interface={<PassportPhotoMaker />}
        relatedTools={
          <>
            <section className="mb-12">
              <SectionTitle title="How It Works" align="left" className="mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <Card key={i} className="border border-gray-200 shadow-sm">
                      <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
            <RelatedTools currentToolHref="/passport-photo-maker" relatedHrefs={relatedHrefs} />
          </>
        }
        faq={<ToolFAQ items={faqItems} />}
        latestArticles={<section><h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{homepageArticles.map((post) => (<ArticleCard key={post.slug} post={post} />))}</div></section>}
      />
    </>
  );
}
