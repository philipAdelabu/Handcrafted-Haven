'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Send, Sparkles, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSent(true)
    } catch (error) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-300 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-2xl"></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">Reset Password 🔐</h1>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-indigo-100">We'll send you a reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {sent ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Sent! 📧</h3>
                  <p className="text-gray-600 mb-6">
                    Check your email for password reset instructions
                  </p>
                  <Link href="/auth/signin">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-base"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        Send Reset Link
                        <Send className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <Link href="/auth/signin" className="text-gray-600 hover:text-purple-600 text-sm flex items-center justify-center gap-1">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                </>
              )}
            </form>

            <div className="px-8 pb-6">
              <div className="flex justify-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secure Reset
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}