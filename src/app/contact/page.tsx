'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  User,
  Building,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

// Use the correct icon names from lucide-react
// Twitter is now 'Twitter' (still works) but let's use 'X' or keep as is
// Instagram is 'Instagram' (still works in newer versions)
// If you get errors, use these alternative names:
// - For Twitter: 'Twitter' or 'X' 
// - For Instagram: 'Instagram'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setError('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Message Sent! 📧</h2>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out! We'll get back to you within 24 hours.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              Return Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">📬 Contact Us</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Have a question or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-100 rounded-full flex-shrink-0">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <a href="mailto:info@handcraftedhaven.com" className="text-gray-500 hover:text-indigo-600 transition-colors">
                      info@handcraftedhaven.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <a href="tel:+15551234567" className="text-gray-500 hover:text-purple-600 transition-colors">
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-100 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Address</p>
                    <p className="text-gray-500">
                      123 Artisan Lane<br />
                      Craftville, CA 90210<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-full flex-shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Business Hours</p>
                    <p className="text-gray-500">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat - Sun: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="p-2 bg-gray-100 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                      <path d="m10 15 5-3-5-3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 rounded-xl"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 rounded-xl"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="pl-10 rounded-xl"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.070911210967!2d-122.03083968469493!3d37.32987997983985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5b6fc22a2a5%3A0x8d3a2da6b6c4c7c7!2sSilicon%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}