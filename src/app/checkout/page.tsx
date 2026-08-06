'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ArrowLeft,
  ShoppingBag,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import Link from 'next/link'

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [cartItems, setCartItems] = useState<any[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin?callbackUrl=/checkout')
      return
    }
    fetchCart()
  }, [session, status, router])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      setCartItems(data.items || [])
      const total = data.items?.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
      ) || 0
      setCartTotal(total)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    }
  }

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: data,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const order = await response.json()
      router.push(`/orders`)
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to process checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const tax = cartTotal * 0.08
  const shipping = cartTotal > 100 ? 0 : 10
  const total = cartTotal + tax + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Checkout</h1>
              <p className="text-indigo-100">Complete your order</p>
            </div>
            <Link href="/cart">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <Input
                      {...register('firstName', { required: 'First name is required' })}
                      error={errors.firstName?.message}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <Input
                      {...register('lastName', { required: 'Last name is required' })}
                      error={errors.lastName?.message}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    error={errors.email?.message}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <Input
                    {...register('address', { required: 'Address is required' })}
                    error={errors.address?.message}
                    className="rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <Input
                      {...register('city', { required: 'City is required' })}
                      error={errors.city?.message}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <Input
                      {...register('state', { required: 'State is required' })}
                      error={errors.state?.message}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <Input
                      {...register('zipCode', { required: 'ZIP code is required' })}
                      error={errors.zipCode?.message}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <Input
                      {...register('country', { required: 'Country is required' })}
                      error={errors.country?.message}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" />
                      Place Order • ${total.toFixed(2)}
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
              </div>

              <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-indigo-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secure checkout with SSL encryption
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="w-4 h-4 text-blue-500" />
                  Free shipping on orders over $100
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  Secure payment processing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}