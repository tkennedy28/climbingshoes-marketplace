import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy - Climbing Shoe Shop</title>
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/climbing-shoes" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 mb-2">We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Name and contact information (email, phone number)</li>
              <li>Billing and shipping address</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Account credentials</li>
              <li>Product listings and descriptions</li>
              <li>Communications between buyers and sellers</li>
              <li>Reviews and ratings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information Automatically Collected</h2>
            <p className="text-gray-700 mb-2">When you use our service, we automatically collect:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (hardware model, operating system)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Usage data (features used, time spent, clicks)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-2">We use collected information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Provide and maintain our marketplace service</li>
              <li>Process transactions and send transaction notifications</li>
              <li>Respond to comments, questions, and customer service requests</li>
              <li>Send administrative information and updates</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect and prevent fraudulent transactions</li>
              <li>Improve our service and develop new features</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Information Sharing</h2>
            <p className="text-gray-700 mb-2">We may share your information with:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Other Users:</strong> Buyers and sellers see necessary transaction information</li>
              <li><strong>Service Providers:</strong> Third parties that help us operate our business (e.g., Stripe for payments)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger or sale of our business</li>
              <li><strong>Consent:</strong> With your consent or at your direction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Access and update your account information</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies through your browser settings</li>
              <li>Request a copy of your personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
            <p className="text-gray-700">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Third-Party Services</h2>
            <p className="text-gray-700">
              Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700">
              Our service is not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries other than your own. By using our service, you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Data Retention</h2>
            <p className="text-gray-700">
              We retain personal information for as long as necessary to provide our services and fulfill the purposes described in this policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. California Privacy Rights</h2>
            <p className="text-gray-700">
              California residents have additional rights under the CCPA, including the right to know what personal information is collected, request deletion, and opt-out of the sale of personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@climbingshoeshop.com
              <br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}