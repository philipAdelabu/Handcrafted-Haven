'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Sparkles,
  Shield,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'
import { Toast } from '@/components/ui/Toast'



export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)


  useEffect(() => {
  if (searchParams.get('registered') === 'true') {
    setShowSuccess(true)
    // Remove the param from URL
    const url = new URL(window.location.href)
    url.searchParams.delete('registered')
    window.history.replaceState({}, '', url.toString())
  }
}, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError('Invalid email or password. Please try again.')
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  {showSuccess && (
  <Toast 
    message="Account created successfully! Please sign in." 
    type="success"
    onClose={() => setShowSuccess(false)}
  />
)}

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Decorative Elements */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-300 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-2xl"></div>
          
          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">Welcome Back! 👋</h1>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-indigo-100">Sign in to your Handcrafted Haven account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            {/* Footer with Trust Badges */}
            <div className="px-8 pb-6">
              <div className="flex justify-center gap-6 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secure Login
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Handcrafted Haven
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Trusted by 1000+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}