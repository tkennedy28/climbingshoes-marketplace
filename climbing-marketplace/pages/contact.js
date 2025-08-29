import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ContactPage() {
  // EDITABLE CONTENT - Update these values as needed
  const contactInfo = {
    email: 'Tom@TheGearWall.com',
    phone: '(330) 541-1028',
    phoneDisplay: '(330) 541-1028',
    urgentEmail: 'Tom@thegearwall.com Subject: URGENT',
    safetyEmail: 'Tom@thegearwall.com',
    // Social media links - update with your actual URLs
    social: {
      facebook: 'https://facebook.com/climbingshoeshop',
      instagram: 'https://instagram.com/climbingshoeshop',
      twitter: 'https://twitter.com/climbingshoeshop',
      youtube: 'https://youtube.com/climbingshoeshop'
    }
  };

  // Support hours - edit as needed
  const supportHours = {
    weekdays: 'Monday - Friday: 9am - 6pm MST',
    saturday: 'Saturday: 10am - 4pm MST',
    sunday: 'Sunday: 12pm - 4pm MST',
    emailResponse: '24 hours',
    phoneAvailable: true
  };

  // Response times by subject
  const responseTime = {
    general: '24 hours',
    order: '2-4 hours',
    technical: '24 hours',
    partnership: '48 hours',
    feedback: '72 hours'
  };

  // FAQ content - add/edit/remove as needed
  const faqs = [
    {
      question: 'How do I list my climbing shoes for sale?',
      answer: 'Simply create an account, click "Sell Shoes" in your dashboard, add photos and details, and your listing will go live immediately.'
    },
    {
      question: 'What fees do you charge?',
      answer: 'We charge an 8% marketplace fee only when your item sells, plus standard payment processing fees (2.9% + $0.30).'
    },
    {
      question: 'How is shipping handled?',
      answer: 'Sellers are responsible for shipping. We recommend USPS Priority Mail with tracking. Buyers typically pay shipping costs.'
    },
    {
      question: 'What if my shoes don\'t fit?',
      answer: 'Check the seller\'s return policy before purchasing. New shoes typically have a 30-day return policy. Used shoes vary by seller.'
    },
    {
      question: 'How do I know if a seller is trustworthy?',
      answer: 'Check seller ratings, reviews, and verification badges. We also offer buyer protection on all purchases.'
    },
    {
      question: 'Can I negotiate prices?',
      answer: 'Yes! If a listing has "Accepts Offers" enabled, you can make an offer below the asking price.'
    }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
    orderNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'general',
          message: '',
          orderNumber: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: `Response within ${supportHours.emailResponse}`,
      contact: contactInfo.email,
      action: `mailto:${contactInfo.email}`
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: supportHours.weekdays,
      contact: contactInfo.phoneDisplay,
      action: `tel:${contactInfo.phone}`
    },
    {
      icon: '💬',
      title: 'Text Support',
      description: 'Quick responses during business hours',
      contact: contactInfo.phone,
      action: `sms:${contactInfo.phone}`
    },
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Instant answers to common questions',
      contact: 'View FAQs',
      action: '#faq'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Contact Us - Climbing Shoe Shop | Get Help & Support</title>
        <meta name="description" content="Contact Climbing Shoe Shop for support, questions, or feedback. We're here to help with your climbing shoe marketplace needs." />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-amber-600 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/climbing-shoes" className="text-amber-100 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-amber-50 max-w-3xl">
            We're here to help! Reach out with questions, feedback, or if you need support with your climbing shoe journey.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Can We Help?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="bg-gray-50 rounded-lg p-6 text-center hover:bg-amber-50 transition group"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-amber-700">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                <p className="text-amber-700 font-medium">{method.contact}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & FAQ */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    ✅ Thank you for your message! We'll get back to you within {responseTime[formData.subject] || '24 hours'}.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    ❌ Something went wrong. Please try again or email us directly at {contactInfo.email}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="general">General Question</option>
                    <option value="order">Order Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="feedback">Feedback/Suggestion</option>
                  </select>
                </div>

                {formData.subject === 'order' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order/Listing Number
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., LST-12345"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Expected response: {responseTime[formData.subject]}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>

            {/* FAQ Section */}
            <div id="faq">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="bg-white rounded-lg shadow">
                    <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 font-medium">
                      {faq.question}
                    </summary>
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Can't find what you're looking for?</strong> Check out our comprehensive{' '}
                  <Link href="/how-it-works" className="underline hover:text-amber-900">
                    How It Works
                  </Link>{' '}
                  guide or send us a message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Hours */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Support Hours</h2>
          <div className="bg-amber-50 rounded-lg shadow p-6 inline-block">
            <div className="space-y-2 text-left">
              <p className="text-gray-700">{supportHours.weekdays}</p>
              <p className="text-gray-700">{supportHours.saturday}</p>
              <p className="text-gray-700">{supportHours.sunday}</p>
              <div className="pt-4 mt-4 border-t border-amber-200">
                <p className="text-sm text-gray-600">
                  Email support available 24/7 • Response within {supportHours.emailResponse}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              For urgent issues:
            </p>
            <a href={`mailto:${contactInfo.urgentEmail}`} className="text-amber-700 font-medium hover:text-amber-800">
              {contactInfo.urgentEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Helpful Resources</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/how-it-works" className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition shadow">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-medium group-hover:text-amber-700">How It Works</h3>
              <p className="text-sm text-gray-600">Learn the basics</p>
            </Link>
            
            <Link href="/size-guide" className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition shadow">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="font-medium group-hover:text-amber-700">Size Guide</h3>
              <p className="text-sm text-gray-600">Find your fit</p>
            </Link>
            
            <Link href="/resolers" className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition shadow">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="font-medium group-hover:text-amber-700">Resolers</h3>
              <p className="text-sm text-gray-600">Repair services</p>
            </Link>
            
            <Link href="/returns" className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition shadow">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-medium group-hover:text-amber-700">Returns</h3>
              <p className="text-sm text-gray-600">Return policy</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
          <p className="text-gray-600 mb-8">
            Follow us for climbing tips, gear updates, and community stories
          </p>
          <div className="flex justify-center gap-6">
            <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center hover:bg-amber-100 transition">
              <span className="text-xl">📘</span>
            </a>
            <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center hover:bg-amber-100 transition">
              <span className="text-xl">📷</span>
            </a>
            <a href={contactInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center hover:bg-amber-100 transition">
              <span className="text-xl">🐦</span>
            </a>
            <a href={contactInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center hover:bg-amber-100 transition">
              <span className="text-xl">📺</span>
            </a>
          </div>
        </div>
      </div>

      {/* Safety Contact */}
      <div className="py-8 bg-red-50 border-t border-red-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-red-800">
            <strong>Report Safety Issues:</strong> If you encounter fraudulent listings or safety concerns, 
            please email <a href={`mailto:${contactInfo.safetyEmail}`} className="underline">{contactInfo.safetyEmail}</a> immediately.
          </p>
        </div>
      </div>
    </div>
  );
}