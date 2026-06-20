import { Metadata } from 'next';
import { Section } from '@/components/shared/card';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how ShareTextQR collects, uses, and protects your information. Our privacy-first approach to text sharing.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: January 2024
          </p>
        </div>
      </section>

      <Section background="default">
        <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              At ShareTextQR, we take your privacy seriously. Our service is designed from the
              ground up with a privacy-first approach. This policy outlines how we handle
              information when you use our service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Information We Do NOT Collect
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <li>We do not store the text you enter to generate QR codes</li>
              <li>We do not require accounts or personal information</li>
              <li>We do not track individual users or their QR codes</li>
              <li>We do not sell or share any user data</li>
              <li>We do not use cookies for tracking purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              How the Service Works
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ShareTextQR generates QR codes directly in your browser. The text you enter
              is processed client-side and encoded into a QR code. This text never travels
              to our servers or is stored in any database.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              When you close the browser tab or generate a new QR code, the previous text
              is gone. There is no history, no logs, no records.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may use anonymous, aggregated analytics to understand general usage patterns
              (such as number of visits, geographic distribution, and general page performance).
              This data cannot be linked to individual users or their content.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Third-Party Services
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our website may use standard web technologies (CDNs, fonts) that may collect
              technical data according to their own policies. We do not integrate any
              third-party tracking or advertising services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Security
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              While we do not store your text, we still employ industry-standard security
              practices for our website infrastructure, including HTTPS encryption and
              secure hosting.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Children&apos;s Privacy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our service is safe for all ages, as we do not collect any personal
              information. Parents and educators can confidently use ShareTextQR with
              children and students.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Changes to This Policy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We may update this privacy policy occasionally. Any changes will be posted
              on this page with an updated revision date.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions about this privacy policy or our privacy practices,
              please contact us at privacy@sharetextqr.com.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
