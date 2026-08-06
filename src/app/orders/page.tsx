'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  ArrowRight,
  Calendar,
  MapPin,
  CreditCard,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product: {
    name: string
    images: string[]
  }
}

interface Order {
  id: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  createdAt: string
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  items: OrderItem[]
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin?callbackUrl=/orders')
      return
    }

    fetchOrders()
  }, [session, status, router])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'PROCESSING':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'SHIPPED':
        return <Truck className="w-5 h-5 text-purple-500" />
      case 'DELIVERED':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatAddress = (address: Order['shippingAddress']) => {
    return `${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-500">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <ShoppingBag className="w-8 h-8" />
                My Orders
              </h1>
              <p className="text-indigo-100 text-lg">
                View and track all your orders
              </p>
            </div>
            <Link href="/products">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Orders Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to discover unique handcrafted treasures!
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-semibold">{order.status}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Order #{order.id.slice(0, 8)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {item.product.images[0] ? (
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-500">
                        +{order.items.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="mt-4 flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        View Details
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Shipping Address */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          Shipping Address
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatAddress(order.shippingAddress)}
                        </p>
                      </div>

                      {/* Order Summary */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
                          <CreditCard className="w-4 h-4 text-indigo-500" />
                          Order Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tax</span>
                            <span className="font-medium">${order.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shipping</span>
                            <span className="font-medium">${order.shipping.toFixed(2)}</span>
                          </div>
                          {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount</span>
                              <span>-${order.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-bold text-gray-900">
                              <span>Total</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* All Items */}
                    <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-3">All Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                {item.product.images[0] ? (
                                  <Image
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                    No img
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{item.product.name}</p>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <div className="font-semibold text-gray-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}