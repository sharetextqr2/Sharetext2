import { Metadata } from 'next';
import { Section } from '@/components/shared/card';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions for using ShareTextQR. Please read these terms carefully before using our service.',
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: January 2024
          </p>
        </div>
      </section>

      <Section background="default">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 p-6 sm:p-10">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Welcome to ShareTextQR. By using our service, you agree to these terms. Please
              read them carefully.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              1. Service Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ShareTextQR is a free web application that allows users to generate QR codes
              from text. The service is provided &quot;as is&quot; without warranties of any kind.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              2. Acceptable Use
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              You agree to use ShareTextQR only for lawful purposes. You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-4">
              <li>Share illegal, harmful, or malicious content</li>
              <li>Attempt to disrupt or overload our service</li>
              <li>Use the service for any fraudulent purposes</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              3. No Data Storage
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ShareTextQR does not store your text content on our servers. Text is processed
              entirely in your browser and encoded directly into the QR code. We have no
              access to or control over the content you share.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              4. Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which
              describes how we handle any limited information we may collect.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The ShareTextQR website, design, and branding are protected by intellectual
              property laws. You are free to use the generated QR codes for any legitimate
              purpose.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The service is provided &quot;as is&quot; without warranties of any kind, express or
              implied. We do not guarantee uninterrupted service or that the service will
              be error-free.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To the fullest extent permitted by law, ShareTextQR shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising
              from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              8. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              9. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              These terms shall be governed by and construed in accordance with applicable
              laws, without regard to conflict of law principles.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
              10. Contact
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions about these terms, please contact us at
              legal@sharetextqr.com.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
