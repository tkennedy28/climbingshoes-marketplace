import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Service - Climbing Shoe Shop</title>
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using Climbing Shoe Shop, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use of Our Marketplace</h2>
            <p className="text-gray-700 mb-2">You may use our marketplace for lawful purposes only. You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>List counterfeit or stolen climbing equipment</li>
              <li>Misrepresent the condition of items</li>
              <li>Engage in fraudulent transactions</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with the proper working of the marketplace</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-700">
              When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Product Listings</h2>
            <p className="text-gray-700">
              Sellers are responsible for the accuracy of their listings, including descriptions, images, and pricing. All climbing shoes and equipment must be authentic and as described. We reserve the right to remove listings that violate our policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Transactions</h2>
            <p className="text-gray-700">
              All transactions are between buyers and sellers. We facilitate the transaction but are not a party to it. Payment processing is handled through Stripe, and their terms also apply. We are not responsible for any disputes between buyers and sellers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Fees</h2>
            <p className="text-gray-700">
              We charge a marketplace fee on successful transactions. Current fees are displayed during the listing process. We reserve the right to change our fee structure with 30 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this site, except user-generated content, is the property of Climbing Shoe Shop. Users retain rights to their content but grant us a license to display it on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700">
              Our service is provided "as is" without warranties of any kind. We do not guarantee the quality, safety, or legality of listed items. Users should exercise caution and judgment when making transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-700">
              To the maximum extent permitted by law, Climbing Shoe Shop shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Indemnification</h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Climbing Shoe Shop from any claims, damages, or expenses arising from your use of our service or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that violates these terms or is harmful to other users or our business.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Governing Law</h2>
            <p className="text-gray-700">
              These terms shall be governed by the laws of the United States and the state in which Climbing Shoe Shop operates, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or site notification. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@climbingshoeshop.com
              <br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}